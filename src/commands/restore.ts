// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as cp from 'child_process';
import { workspace } from 'vscode';
import { getActiveOrFirstWorkspace } from '../utils';
import { logger } from '../logger';

/**
 * Runs the PSRule analysis task.
 * @returns A promise for the task.
 */
export async function restore(): Promise<void> {
    const workspace = getActiveOrFirstWorkspace();
    if (!workspace) return;

    logger.log('Restoring modules.');

    const tool = cp.spawnSync('ps-rule', ['restore', '--verbose'], {
        cwd: workspace.uri.fsPath,
    });
    logger.verbose(`${tool.stdout}`);

    if (tool.status !== 0) {
        logger.log(`Failed to restore modules. Exit code: ${tool.status}`);
        return;
    }
}
