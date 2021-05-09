// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import { logger } from './logger';

/**
 * Activate PSRule extension.
 * @param context An extension context.
 */
export function activate(context: vscode.ExtensionContext): void {
    // Check the extension
    checkExtension(context);
}

/**
 * Deactivate PSRule extension.
 */
export function deactivate(): void {
    if (logger) {
        logger.dispose();
    }
}

/**
 * Check channel and version of the extension activated.
 * @param context An extension context.
 */
function checkExtension(context: vscode.ExtensionContext): void {
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
}
