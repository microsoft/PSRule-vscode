// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System;
using System.CommandLine;
using System.Threading.Tasks;

namespace PSRule.EditorServices;

static class Program
{
    /// <summary>
    /// Entry point for CLI tool.
    /// </summary>
    static async Task<int> Main(string[] args)
    {
        var user = System.Management.Automation.ModuleIntrinsics.GetPSModulePath(System.Management.Automation.ModuleIntrinsics.PSModulePathScope.User);
        System.Environment.SetEnvironmentVariable("PSModulePath", user, EnvironmentVariableTarget.Process);

        return await ClientBuilder.New().InvokeAsync(args);
    }
}
