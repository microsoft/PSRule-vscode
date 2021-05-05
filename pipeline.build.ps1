# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

# Invoke-Build
# CI pipeline script for PSRule-vscode

[CmdletBinding()]
param (
    [Parameter(Mandatory = $False)]
    [String]$Build,

    [Parameter(Mandatory = $False)]
    [ValidateSet('preview', 'stable', 'canary')]
    [String]$Channel,

    [Parameter(Mandatory = $False)]
    [String]$Configuration = 'Debug',

    [Parameter(Mandatory = $False)]
    [String]$OutputPath = (Join-Path -Path $PWD -ChildPath out),

    [Parameter(Mandatory = $False)]
    [String]$ApiKey,

    [Parameter(Mandatory = $False)]
    [String]$AssertStyle = 'AzurePipelines'
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

    if ($versionParts.Length -eq 2 -and $Channel -eq 'preview') {
        $version = [String]::Concat($version.Split('.')[0], '.', $versionParts[1].Substring(1, 4), '.0');
        $Channel = 'preview';
    }
    else {
        $Channel = 'stable';
    }
}

# Handle channel
if ([String]::IsNullOrEmpty('Channel')) {
    $Channel = 'preview';
}
$channelSuffix = '-preview';
switch ($Channel) {
    'canary' { $channelSuffix = '-canary' }
    'stable' { $channelSuffix = '' }
    default { $channelSuffix = '-preview' }
}

Write-Host -Object "[Pipeline] -- Using channel: $Channel" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- Using channelSuffix: $channelSuffix" -ForegroundColor Green;
Write-Host -Object "[Pipeline] -- Using version: $version" -ForegroundColor Green;

$packageRoot = Join-Path -Path $OutputPath -ChildPath 'package';
$packageName = "psrule-vscode$channelSuffix";
$packagePath = Join-Path -Path $packageRoot -ChildPath "$packageName.vsix";

function Get-RepoRuleData {
    [CmdletBinding()]
    param (
        [Parameter(Position = 0, Mandatory = $False)]
        [String]$Path = $PWD
    )
    process {
        GetPathInfo -Path $Path -Verbose:$VerbosePreference;
    }
}

function GetPathInfo {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $True)]
        [String]$Path
    )
    begin {
        $items = New-Object -TypeName System.Collections.ArrayList;
    }
    process {
        $Null = $items.Add((Get-Item -Path $Path));
        $files = @(Get-ChildItem -Path $Path -File -Recurse -Include *.ps1,*.psm1,*.psd1,*.cs | Where-Object {
            !($_.FullName -like "*.Designer.cs") -and
            !($_.FullName -like "*/bin/*") -and
            !($_.FullName -like "*/obj/*") -and
            !($_.FullName -like "*\obj\*") -and
            !($_.FullName -like "*\bin\*") -and
            !($_.FullName -like "*\out\*") -and
            !($_.FullName -like "*/out/*")
        });
        $Null = $items.AddRange($files);
    }
    end {
        $items;
    }
}

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
    # Update channel
    $package = Get-Content ./package.json -Raw | ConvertFrom-Json;
    if ($package.name -ne $packageName) {
        $package.name = $packageName;
        $package | ConvertTo-Json -Depth 99 | Set-Content ./package.json;
    }

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

# Synopsis: Install NuGet provider
task NuGet {
    if ($Null -eq (Get-PackageProvider -Name NuGet -ErrorAction Ignore)) {
        Install-PackageProvider -Name NuGet -Force -Scope CurrentUser;
    }
}

# Synopsis: Install PSRule
task PSRule NuGet, {
    if ($Null -eq (Get-InstalledModule -Name PSRule -MinimumVersion 1.3.0 -ErrorAction Ignore)) {
        Install-Module -Name PSRule -Repository PSGallery -MinimumVersion 1.3.0 -Scope CurrentUser -Force;
    }
    Import-Module -Name PSRule -Verbose:$False;
}

# Synopsis: Run validation
task Rules PSRule, {
    $assertParams = @{
        Path = './.ps-rule/'
        Style = $AssertStyle
        OutputFormat = 'NUnit3'
        ErrorAction = 'Stop'
        As = 'Summary'
    }
    Assert-PSRule @assertParams -InputPath $PWD -Format File -OutputPath reports/ps-rule-file.xml;
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

    if ($Channel -eq 'preview') {
        exec { & npm run publish -- patch --packagePath $packagePath --pat $ApiKey }
    }
    if ($Channel -eq 'stable') {
        exec { & npm run publish -- --packagePath $packagePath --pat $ApiKey }
    }
}

# Synopsis: Add shipit build tag
task TagBuild {
    if ($Null -ne $Env:BUILD_DEFINITIONNAME) {
        Write-Host "`#`#vso[build.addbuildtag]shipit";
    }
}

task Build Clean, PackageRestore, VersionExtension, PackageExtension

task Install Build, InstallExtension

task . Build

task Release ReleaseExtension, TagBuild
