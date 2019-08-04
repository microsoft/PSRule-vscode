# Invoke-Build
# CI pipeline script for PSRule-vscode

[CmdletBinding()]
param (
    [Parameter(Mandatory = $False)]
    [String]$Build = '0.0.1',

    [Parameter(Mandatory = $False)]
    [String]$Configuration = 'Debug',

    [Parameter(Mandatory = $False)]
    [String]$OutputPath = (Join-Path -Path $PWD -ChildPath out),

    [Parameter(Mandatory = $False)]
    [String]$ApiKey
)

Write-Host -Object "[Pipeline] -- PWD: $PWD" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- OutputPath: $OutputPath" -ForegroundColor Green;
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

$packageRoot = Join-Path -Path $OutputPath -ChildPath 'package';
$packagePath = Join-Path -Path $packageRoot -ChildPath 'psrule-vscode-preview.vsix';

task BuildExtension {
    Write-Host '> Building extension' -ForegroundColor Green;
    exec { & npm run compile }
}

task PackageExtension {
    Write-Host '> Packaging PSRule-vscode' -ForegroundColor Green;
    if (!(Test-Path -Path $packageRoot)) {
        $Null = New-Item -Path $packageRoot -ItemType Directory -Force;
    }
    exec { & npm run pack -- --out $packagePath }
}

# Synopsis: Install the extension in Visual Studio Code
task InstallExtension {
    Write-Host '> Installing PSRule-vscode' -ForegroundColor Green;
    exec { & code --install-extension $packagePath --force }
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

# Synopsis: Remove temp files
task Clean {
    Remove-Item -Path out,reports -Recurse -Force -ErrorAction Ignore;
}

# Synopsis: Restore NPM packages
task PackageRestore {
    exec { & npm install --no-save }
}

task ReleaseExtension {
    exec { & npm install vsce --no-save }
    exec { & npm run publish -- --packagePath $packagePath --pat $ApiKey }
}

# Synopsis: Add shipit build tag
task TagBuild {
    if ($Null -ne $Env:BUILD_DEFINITIONNAME) {
        Write-Host "`#`#vso[build.addbuildtag]shipit";
    }
}

task Build Clean, PackageRestore, BuildExtension, VersionExtension, PackageExtension

task Install Build, InstallExtension

task . Build

task Release ReleaseExtension, TagBuild
