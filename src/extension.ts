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
}
