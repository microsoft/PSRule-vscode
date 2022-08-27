// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import { logger } from './logger';
import { PSRuleTaskProvider } from './tasks';
import { ConfigurationManager } from './configuration';
import { pwsh } from './powershell';
import { DocumentationLensProvider } from './docLens';
import { createOptionsFile } from './commands/createOptionsFile';
import { openOptionsFile } from './commands/openOptionsFile';
import { walkthroughCopySnippet } from './commands/walkthroughCopySnippet';
import { configureSettings } from './commands/configureSettings';

export let taskManager: PSRuleTaskProvider | undefined;
export let docLensProvider: DocumentationLensProvider | undefined;

export interface ExtensionInfo {
    id: string;
    version: string;
    channel: string;
    path: string;
}

export class ExtensionManager implements vscode.Disposable {
    private _info!: ExtensionInfo;
    private _context!: vscode.ExtensionContext;

    constructor() {}

    /**
     * Information about the extension.
     */
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

    public get isTrusted(): boolean {
        return vscode.workspace.isTrusted;
    }

    /**
     * A task provider if the workspace is trusted, otherwise returns undefined.
     */
    public get tasks(): PSRuleTaskProvider | undefined {
        return taskManager;
    }

    public activate(context: vscode.ExtensionContext) {
        this._context = context;
        this._info = this.checkExtension(context);
        this.activateFeatures();
    }

    public dispose(): void {
        if (docLensProvider) {
            docLensProvider.dispose();
        }
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

    private activateFeatures(): void {
        this.switchMode();
        if (this._context) {
            this._context.subscriptions.push(
                vscode.workspace.onDidGrantWorkspaceTrust(() => {
                    this.switchMode();
                })
            );
            this._context.subscriptions.push(
                vscode.commands.registerCommand('PSRule.openOptionsFile', (path: string) => {
                    openOptionsFile(path);
                })
            );
            this._context.subscriptions.push(
                vscode.commands.registerCommand('PSRule.createOptionsFile', (path: string) => {
                    createOptionsFile(path);
                })
            );
            this._context.subscriptions.push(
                vscode.commands.registerCommand('PSRule.configureSettings', () => {
                    configureSettings();
                })
            );
            this._context.subscriptions.push(
                vscode.commands.registerCommand('PSRule.walkthroughCopySnippet', (args: { snippet: string }) => {
                    walkthroughCopySnippet(args.snippet);
                })
            );
        }
    }

    private switchMode(): void {
        ConfigurationManager.configure(this._context);

        if (!docLensProvider) {
            docLensProvider = new DocumentationLensProvider(logger, this._context);
            docLensProvider.register();
        }

        if (this.isTrusted) {
            this.setContextVariables();
        }

        if (this.isTrusted) {
            pwsh.configure(this._info);
        }

        if (this.isTrusted) {
            taskManager = new PSRuleTaskProvider(logger, this._context);
            taskManager.register();
        }
    }

    private setContextVariables(): void {
        vscode.commands.executeCommand('setContext', 'PSRule.workspaceTrusted', this.isTrusted);
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
            path: context.extensionPath,
        };
        return result;
    }
}

export const ext: ExtensionManager = new ExtensionManager();
