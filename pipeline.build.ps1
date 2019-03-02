#Requires -Modules @{ ModuleName = "InvokeBuild"; ModuleVersion = "5.4.0" }

param (
    [Parameter(Mandatory = $False)]
    [String]$Build,

    [Parameter(Mandatory = $False)]
    [AllowNull()]
    [String]$ReleaseVersion,

    [Parameter(Mandatory = $False)]
    [String]$Configuration = 'Debug',

    [Parameter(Mandatory = $False)]
    [String]$ArtifactPath = (Join-Path -Path $PWD -ChildPath out/package),

    [Parameter(Mandatory = $False)]
    [String]$ApiKey
)

task CopyExtension {

    if (!(Test-Path -Path out/extension/schemas)) {
        $Null = New-Item -Path out/extension/schemas -ItemType Directory -Force;
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
    Copy-Item -Path schemas/* -Destination out/extension/schemas;
}

task BuildExtension {
    Write-Host "> Building PSRule-vscode" -ForegroundColor Green
    exec { & npm run compile }
}

task PackageExtension {
    Write-Host "> Packaging PSRule-vscode" -ForegroundColor Green

    if (!(Test-Path -Path out/package)) {
        $Null = New-Item -Path out/package -ItemType Directory -Force;
    }

    $workingPath = $PWD;
    $packagePath = Join-Path -Path $workingPath -ChildPath 'out/package/psrule-vscode-preview.vsix';

    Push-Location out/extension;

    exec { & vsce package --out $packagePath }

    Pop-Location;
}

# Synopsis: Install the extension in Visual Studio Code
task InstallExtension {
    Write-Host "> Installing PSRule-vscode" -ForegroundColor Green
    exec { & code --install-extension ./out/package/psrule-vscode-preview.vsix }
}

task VersionExtension {

    if (![String]::IsNullOrEmpty($ReleaseVersion)) {
        Write-Verbose -Message "[VersionExtension] -- ReleaseVersion: $ReleaseVersion";
        $Build = $ReleaseVersion;
    }

    if (![String]::IsNullOrEmpty($Build)) {
        Write-Verbose -Message "[VersionExtension] -- ModuleVersion: $Build";

        $version = $Build;
        $revision = [String]::Empty;

        Write-Verbose -Message "[VersionExtension] -- Using Version: $version";
        Write-Verbose -Message "[VersionExtension] -- Using Revision: $revision";

        if ($version -like '*-*') {
            [String[]]$versionParts = $version.Split('-', [System.StringSplitOptions]::RemoveEmptyEntries);
            $version = $versionParts[0];

            if ($versionParts.Length -eq 2) {
                $revision = $versionParts[1];
            }
        }

        # Update extension version
        if (![String]::IsNullOrEmpty($version)) {
            Write-Verbose -Message "[VersionExtension] -- Updating extension version";
            $package = Get-Content ./out/extension/package.json -Raw | ConvertFrom-Json;
            $package.version = $version;
            $package | ConvertTo-Json -Depth 99 | Set-Content ./out/extension/package.json;
        }

        # Update pre-release version
        if (![String]::IsNullOrEmpty($revision)) {
            # Write-Verbose -Message "[VersionExtension] -- Updating extension Prerelease";
        }
    }
}

# Synopsis: Remove temp files.
task Clean {
    Remove-Item -Path out,reports -Recurse -Force -ErrorAction Ignore;
}

# Synopsis: Restore NPM packages
task PackageRestore {
    exec { & npm install }
    exec { npm install -g vsce }
}

task ReleaseExtension {
    $packagePath = Join-Path -Path $ArtifactPath -ChildPath 'extension/psrule-vscode-preview.vsix';

    exec { & npm install -g vsce }
    exec { & vsce publish --packagePath $packagePath --pat $ApiKey }
}

task Build Clean, PackageRestore, CopyExtension, BuildExtension, PackageExtension

task Install Build, InstallExtension

task . Build

task Release ReleaseExtension
