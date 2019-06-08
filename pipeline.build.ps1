# Invoke-Build
# CI pipeline script for PSRule-vscode

[CmdletBinding()]
param (
    [Parameter(Mandatory = $False)]
    [String]$Build = '0.0.1',

    [Parameter(Mandatory = $False)]
    [String]$Configuration = 'Debug',

    [Parameter(Mandatory = $False)]
    [String]$ArtifactPath = (Join-Path -Path $PWD -ChildPath out/package),

    [Parameter(Mandatory = $False)]
    [String]$ApiKey
)

Write-Host -Object "[Pipeline] -- PWD: $PWD" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- ArtifactPath: $ArtifactPath" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- BuildNumber: $($Env:BUILD_BUILDNUMBER)" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- SourceBranch: $($Env:BUILD_SOURCEBRANCH)" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- SourceBranchName: $($Env:BUILD_SOURCEBRANCHNAME)" -ForegroundColor Green;

if ($Env:SYSTEM_DEBUG -eq 'true') {
    $VerbosePreference = 'Continue';
}

if ($Env:BUILD_SOURCEBRANCH -like '*/tags/*' -and $Env:BUILD_SOURCEBRANCHNAME -like 'v0.*') {
    $Build = $Env:BUILD_SOURCEBRANCHNAME.Substring(1);
}

$version = $Build;
$versionSuffix = [String]::Empty;

if ($version -like '*-*') {
    [String[]]$versionParts = $version.Split('-', [System.StringSplitOptions]::RemoveEmptyEntries);
    $version = $versionParts[0];

    if ($versionParts.Length -eq 2) {
        $versionSuffix = $versionParts[1];
    }
}

Write-Host -Object "[Pipeline] -- Using version: $version" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- Using versionSuffix: $versionSuffix" -ForegroundColor Green;


task CopyExtension {

    if (!(Test-Path -Path out/extension/schemas)) {
        $Null = New-Item -Path out/extension/schemas -ItemType Directory -Force;
    }

    if (!(Test-Path -Path out/extension/snippets)) {
        $Null = New-Item -Path out/extension/snippets -ItemType Directory -Force;
    }

    if (!(Test-Path -Path out/extension/syntaxes)) {
        $Null = New-Item -Path out/extension/syntaxes -ItemType Directory -Force;
    }

    if (!(Test-Path -Path out/extension/out)) {
        $Null = New-Item -Path out/extension/out -ItemType Directory -Force;
    }

    Copy-Item -Path package.json -Destination out/extension/;
    Copy-Item -Path package-lock.json -Destination out/extension/;
    Copy-Item -Path *.md -Destination out/extension/;
    Copy-Item -Path LICENSE -Destination out/extension/;
    Copy-Item -Path node_modules -Destination out/extension/node_modules -Recurse -Force;

    # Copy third party notices
    # Copy-Item -Path ThirdPartyNotices.txt -Destination out/extension/;

    # Copy schemas
    Copy-Item -Path schemas/* -Destination out/extension/schemas/;

    # Copy snippets
    Copy-Item -Path snippets/* -Destination out/extension/snippets/;

    # Copy syntaxes
    Copy-Item -Path syntaxes/* -Destination out/extension/syntaxes/;
}

task BuildExtension {
    Write-Host "> Building extension" -ForegroundColor Green
    exec { & npm run compile }
}

task PackageExtension {
    Write-Host "> Packaging PSRule-vscode" -ForegroundColor Green

    if (!(Test-Path -Path out/package)) {
        $Null = New-Item -Path out/package -ItemType Directory -Force;
    }

    $workingPath = $PWD;
    $packagePath = Join-Path -Path $workingPath -ChildPath 'out/package/psrule-vscode-preview.vsix';

    # Push-Location out/extension;

    exec { & npm run pack -- --out $packagePath }

    Pop-Location;
}

# Synopsis: Install the extension in Visual Studio Code
task InstallExtension {
    Write-Host "> Installing PSRule-vscode" -ForegroundColor Green
    exec { & code --install-extension ./out/package/psrule-vscode-preview.vsix --force }
}

task VersionExtension {
    if (![String]::IsNullOrEmpty($Build)) {
        # Update extension version
        if (![String]::IsNullOrEmpty($version)) {
            Write-Verbose -Message "[VersionExtension] -- Updating extension version";
            $package = Get-Content ./package.json -Raw | ConvertFrom-Json;

            if ($package.version -ne $version) {
                $package.version = $version;
                $package | ConvertTo-Json -Depth 99 | Set-Content ./package.json;
            }
        }
    }
}

# Synopsis: Remove temp files.
task Clean {
    Remove-Item -Path out,reports -Recurse -Force -ErrorAction Ignore;
}

# Synopsis: Restore NPM packages
task PackageRestore {
    exec { & npm install --no-save }
}

task ReleaseExtension {
    $packagePath = Join-Path -Path $ArtifactPath -ChildPath 'extension/psrule-vscode-preview.vsix';

    exec { & npm install vsce --no-save }
    exec { & npm run publish -- --packagePath $packagePath --pat $ApiKey }
}

task Build Clean, PackageRestore, BuildExtension, VersionExtension, PackageExtension

task Install Build, InstallExtension

task . Build

task Release ReleaseExtension
