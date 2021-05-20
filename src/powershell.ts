// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

import * as vscode from 'vscode';
import { ExtensionInfo } from './extension';
import { logger } from './logger';

/**
 * External interface from PowerShell extension.
 */
interface IExternalPowerShellDetails {
    exePath: string;
    version: string;
    displayName: string;
    architecture: string;
}

/**
 * External interface from PowerShell extension.
 */
interface IPowerShellExtensionClient {
    registerExternalExtension(id: string, apiVersion?: string): string;
    unregisterExternalExtension(uuid: string): boolean;
    getPowerShellVersionDetails(uuid: string): Promise<IExternalPowerShellDetails>;
}

export class PowerShellExtension implements vscode.Disposable {
    private readonly extension: vscode.Extension<IPowerShellExtensionClient> | undefined;

    private _version!: string;
    private _path!: string;
    private uuid!: string;

    constructor() {
        this.extension = this.getExtension();
        if (this.extension !== undefined && !this.extension.isActive) {
            this.extension.activate();
        }
    }

    public get path(): string {
        return this._path;
    }

    public configure(info: ExtensionInfo): void {
        const powerShellExtensionClient = this.extension!.exports as IPowerShellExtensionClient;
        this.uuid = powerShellExtensionClient.registerExternalExtension(info.id, 'v1');
        powerShellExtensionClient
            .getPowerShellVersionDetails(this.uuid)
            .then((v) => this.handlePowerShell(v));
    }

    public dispose(): void {
        if (this.extension && this.uuid !== undefined) {
            const powerShellExtensionClient = this.extension!.exports as IPowerShellExtensionClient;
            powerShellExtensionClient.unregisterExternalExtension(this.uuid);
        }
    }

    private handlePowerShell(value: IExternalPowerShellDetails): void {
        this._version = value.version;
        this._path = value.exePath;

        logger.verbose(`Using PowerShell ${this._version} from ${this._path}`);
    }

    private getExtension(): vscode.Extension<IPowerShellExtensionClient> | undefined {
        return (
            vscode.extensions.getExtension<IPowerShellExtensionClient>(
                'ms-vscode.powershell-preview'
            ) ?? vscode.extensions.getExtension<IPowerShellExtensionClient>('ms-vscode.powershell')
        );
    }
}

export const pwsh = new PowerShellExtension();
