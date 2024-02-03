# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

# Note:
# Handles dependencies updates.

function Update-Schemas {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $False)]
        [String]$Path = (Join-Path -Path $PWD -ChildPath 'PSRule/schemas/'),

        [Parameter(Mandatory = $False)]
        [String]$Target = (Join-Path -Path $PWD -ChildPath 'schemas/')
    )
    process {
        $files = Get-ChildItem -Path $Path -File -Filter '*.schema.json';
        $files | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination $Target -Force;
        }

        if (!(Test-Path -Path 'out/')) {
            $Null = New-Item -Path 'out/' -ItemType Directory -Force;
        }

        $updates = @(git status --porcelain);
        if ($Null -ne $Env:WORKING_BRANCH -and $Null -ne $updates -and $updates.Length -gt 0) {
            git add schemas/*;
            git commit -m "Bump schemas";
            git push --force -u origin $Env:WORKING_BRANCH;

            $updates | ForEach-Object {
                if ($_ -like '* schemas/*') {
                    "Bump $($_.Substring(3))";
                }
            } | Set-Content -Path 'out/updates.txt' -Force;

            $existingBranch = @(gh pr list --head $Env:WORKING_BRANCH --state open --json number | ConvertFrom-Json);
            if ($Null -eq $existingBranch -or $existingBranch.Length -eq 0) {
                gh pr create -B 'main' -H $Env:WORKING_BRANCH -l 'dependencies' -t 'Bump PSRule schemas' -F 'out/updates.txt';
            }
            else {
                $pr = $existingBranch[0].number
                gh pr edit $pr -F 'out/updates.txt';
            }
        }
    }
}

Export-ModuleMember -Function @(
    'Update-Schemas'
)
