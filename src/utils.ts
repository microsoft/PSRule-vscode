// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fse from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { SnippetString, Uri, WorkspaceFolder, window, workspace } from 'vscode';
import { configuration } from './configuration';
import { ext } from './extension';

/**
 * Calculates the file path of rule documentation for a specific rule based on settings.
 * @param name The name of the rule.
 * @returns The path where the rule markdown documentation should be created/ edited from.
 */
export async function getDocumentationPath(name: string): Promise<Uri | undefined> {
    const workspaceRoot = getActiveOrFirstWorkspace()?.uri;
    const docConfigPath = configuration.get().documentationPath;
    let docRootPath =
        docConfigPath && workspaceRoot ? path.join(workspaceRoot.fsPath, docConfigPath) : undefined;
    let lang = configuration.get().documentationLocalePath;

    if (!docRootPath && window.activeTextEditor?.document.uri) {
        docRootPath = path.dirname(window.activeTextEditor.document.uri.path);
    }
    if (docRootPath) {
        let uri = Uri.file(path.join(docRootPath, lang, `${name}.md`));
        return uri;
    }
    return undefined;
}

/**
 * Get a snippet from disk.
 * @param file The path to a file containing a snippet. When not set, the default extension snippets will be used.
 * @param name The name of the snippet to use. When name is an empty string no snippet is returned.
 * @returns A possible matching snippet string.
 */
export async function readDocumentationSnippet(
    file: string | undefined,
    name: string
): Promise<SnippetString | undefined> {
    if (name === '') return undefined;

    // Try custom snippet file
    const workspaceRoot = getActiveOrFirstWorkspace()?.uri;
    let snippetFile = file && workspaceRoot ? path.join(workspaceRoot.fsPath, file) : undefined;

    // Try built-in snippet file
    if (!snippetFile) {
        const info = await ext.info;
        snippetFile = info ? path.join(info.path, 'snippets/markdown.json') : undefined;
    }

    if (snippetFile && (await fse.pathExists(snippetFile))) {
        let json = await fse.readJson(snippetFile, { encoding: 'utf-8' });
        if (json) {
            let body: string[] = json[name].body;
            return new SnippetString(body.join(os.EOL));
        }
    }
}

function getActiveOrFirstWorkspace(): WorkspaceFolder | undefined {
    if (window.activeTextEditor) {
        return workspace.getWorkspaceFolder(window.activeTextEditor.document.uri);
    }
    return workspace.workspaceFolders && workspace.workspaceFolders.length > 0
        ? workspace.workspaceFolders[0]
        : undefined;
}
