// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import { logger } from './logger';
import { PSRuleTaskProvider } from './tasks';
import { ConfigurationManager } from './configuration';
import { pwsh } from './powershell';

export let taskManager: PSRuleTaskProvider | undefined;

export interface ExtensionInfo {
    id: string;
    version: string;
    channel: string;
}

export class ExtensionManager implements vscode.Disposable {
    private _info!: ExtensionInfo;

    constructor() {}

    public get info(): Promise<ExtensionInfo> {
        const parent = this;
        return new Promise<ExtensionInfo>((resolve, reject) => {
            if (parent._info) {
                resolve(parent._info);
            } else {
                setTimeout(function (): void {
                    if (parent._info) {
                        resolve(parent._info);
                    } else {
                        reject('Failed to get info.');
                    }
                }, 1000);
            }
        });
    }

    public activate(context: vscode.ExtensionContext) {
        this._info = this.checkExtension(context);

        ConfigurationManager.configure(context);

        pwsh.configure(this._info);

        taskManager = new PSRuleTaskProvider(logger, context);
        taskManager.register();
    }

    public dispose(): void {
        if (taskManager) {
            taskManager.dispose();
        }
        if (pwsh) {
            pwsh.dispose();
        }
        if (logger) {
            logger.dispose();
        }
    }

    /**
     * Check channel and version of the extension activated.
     * @param context An extension context.
     */
    private checkExtension(context: vscode.ExtensionContext): ExtensionInfo {
        const extensionVersionKey = 'ps-rule-extension-version';

        // Get channel
        let extensionId = 'bewhite.psrule-vscode';
        let extensionChannel = 'stable';
        if (path.basename(context.globalStorageUri.fsPath) === 'bewhite.psrule-vscode-preview') {
            extensionId = 'bewhite.psrule-vscode-preview';
            extensionChannel = 'preview';
        }
        if (path.basename(context.globalStorageUri.fsPath) === 'bewhite.psrule-vscode-dev') {
            extensionId = 'bewhite.psrule-vscode-dev';
            extensionChannel = 'dev';
        }
        logger.verbose(`Running extension channel: ${extensionChannel}`);

        // Get current version
        const extension = vscode.extensions.getExtension(extensionId)!;
        const extensionVersion: string = extension.packageJSON.version;
        logger.verbose(`Running extension version: ${extensionVersion}`);

        // Get last version
        const lastVersion = context.globalState.get(extensionVersionKey);

        // Save the extension version
        context.globalState.update(extensionVersionKey, extensionVersion);

        // Determine if the channel upgrade message is shown
        const showChannelUpgrade: boolean = vscode.workspace
            .getConfiguration('PSRule.notifications')
            .get('showChannelUpgrade', true);

        if ((extensionChannel === 'preview' || extensionChannel === 'dev') && showChannelUpgrade) {
            const showReleaseNotes = 'Show Release Notes';
            const showExtension = 'Show Extension';
            const alwaysIgnore = 'Always Ignore';

            vscode.window
                .showInformationMessage(
                    `You are running the ${extensionChannel} version of PSRule. A stable version is available.`,
                    showReleaseNotes,
                    showExtension,
                    alwaysIgnore
                )
                .then((choice) => {
                    if (choice === showReleaseNotes) {
                        vscode.commands.executeCommand(
                            'markdown.showPreview',
                            vscode.Uri.file(path.resolve(__dirname, '../../CHANGELOG.md'))
                        );
                    }
                    if (choice === showExtension) {
                        vscode.commands.executeCommand(
                            'workbench.extensions.search',
                            'bewhite.psrule-vscode'
                        );
                    }
                    if (choice === alwaysIgnore) {
                        vscode.workspace
                            .getConfiguration('PSRule.notifications')
                            .update('showChannelUpgrade', false, vscode.ConfigurationTarget.Global);
                    }
                });
        }

        const result: ExtensionInfo = {
            id: extensionId,
            version: extensionVersion,
            channel: extensionChannel,
        };
        return result;
    }
}

export const ext: ExtensionManager = new ExtensionManager();
