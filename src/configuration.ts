// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

import { ConfigurationChangeEvent, ExtensionContext, env, workspace } from 'vscode';
import { configurationItemPrefix } from './consts';

/**
 * The output of analysis tasks.
 */
export enum OutputAs {
    Detail = 'Detail',
    Summary = 'Summary',
}

export enum ExecutionActionPreference {
    /**
     * No preference.
     * This will inherit from the default.
     */
    None = 'None',

    /**
     * Continue to execute silently.
     */
    Ignore = 'Ignore',
    /**
     * Continue to execute but log a warning.
     */
    Warn = 'Warn',

    /**
     * Generate an error.
     */
    Error = 'Error',
}

/**
 * PSRule extension settings.
 */
export interface ISetting {
    codeLensRuleDocumentationLinks: boolean;
    documentationCustomSnippetPath: string | undefined;
    documentationSnippet: string;
    documentationPath: string | undefined;
    documentationLocalePath: string;

    /**
     * Execution options
     */
    executionNotProcessedWarning: boolean | undefined;
    executionRuleExcluded: ExecutionActionPreference;
    executionRuleSuppressed: ExecutionActionPreference;
    executionUnprocessedObject: ExecutionActionPreference;

    /**
     * Determines if experimental features are enabled.
     */
    experimentalEnabled: boolean;
    outputAs: OutputAs;
    notificationsShowChannelUpgrade: boolean;
    notificationsShowPowerShellExtension: boolean;

    /**
     * The name of the default baseline to use for executing rules.
     */
    ruleBaseline: string | undefined;
}

/**
 * Default configuration for PSRule extension settings.
 */
const globalDefaults: ISetting = {
    codeLensRuleDocumentationLinks: true,
    documentationCustomSnippetPath: undefined,
    documentationSnippet: 'Rule Doc',
    documentationPath: undefined,
    documentationLocalePath: env.language,
    executionNotProcessedWarning: undefined,
    executionRuleExcluded: ExecutionActionPreference.None,
    executionRuleSuppressed: ExecutionActionPreference.None,
    executionUnprocessedObject: ExecutionActionPreference.None,
    experimentalEnabled: false,
    outputAs: OutputAs.Summary,
    notificationsShowChannelUpgrade: true,
    notificationsShowPowerShellExtension: true,
    ruleBaseline: undefined,
};

/**
 * A configuration manager class for PSRule.
 */
export class ConfigurationManager {
    private current: ISetting;
    private readonly default: ISetting;
    private readonly configurationItemPrefix: string;

    /**
     * A flag for when setting require reload.
     */
    private pendingLoad: boolean = true;

    constructor(setting?: ISetting, prefix?: string) {
        this.configurationItemPrefix = prefix ?? configurationItemPrefix;
        this.default = setting ?? globalDefaults;
        this.current = { ...this.default };
        this.loadSettings();
    }

    static configure(context: ExtensionContext) {
        if (context) {
            context.subscriptions.push(
                workspace.onDidChangeConfiguration(
                    configuration.onConfigurationChanged,
                    configuration
                )
            );
        }
    }

    public get(): ISetting {
        if (this.pendingLoad) {
            this.loadSettings();
        }
        return this.current;
    }

    private onConfigurationChanged(e: ConfigurationChangeEvent) {
        if (!e.affectsConfiguration(this.configurationItemPrefix)) {
            return;
        }
        this.pendingLoad = true;
    }

    private loadSettings(): void {
        const config = workspace.getConfiguration(this.configurationItemPrefix);

        // Experimental
        let experimental = (this.current.experimentalEnabled = config.get<boolean>(
            'experimental.enabled',
            this.default.experimentalEnabled
        ));

        // Read settings
        this.current.documentationCustomSnippetPath =
            config.get<string>('documentation.customSnippetPath') ??
            this.default.documentationCustomSnippetPath;

        this.current.documentationSnippet =
            config.get<string>('documentation.snippet') ?? this.default.documentationSnippet;

        this.current.documentationPath =
            config.get<string>('documentation.path') ?? this.default.documentationPath;

        this.current.documentationLocalePath =
            config.get<string>('documentation.localePath') ?? this.default.documentationLocalePath;

        this.current.codeLensRuleDocumentationLinks = config.get<boolean>(
            'codeLens.ruleDocumentationLinks',
            this.default.codeLensRuleDocumentationLinks
        );

        this.current.executionNotProcessedWarning = config.get<boolean>('execution.notProcessedWarning');
        this.current.executionRuleExcluded = config.get<ExecutionActionPreference>('execution.ruleExcluded', this.default.executionRuleExcluded);
        this.current.executionRuleSuppressed = config.get<ExecutionActionPreference>('execution.ruleSuppressed', this.default.executionRuleSuppressed);
        this.current.executionUnprocessedObject = config.get<ExecutionActionPreference>('execution.unprocessedObject', this.default.executionUnprocessedObject);

        this.current.outputAs = config.get<OutputAs>('output.as', this.default.outputAs);

        this.current.notificationsShowChannelUpgrade = config.get<boolean>(
            'notifications.showChannelUpgrade',
            this.default.notificationsShowChannelUpgrade
        );

        this.current.notificationsShowPowerShellExtension = config.get<boolean>(
            'notifications.showPowerShellExtension',
            this.default.notificationsShowPowerShellExtension
        );

        this.current.ruleBaseline =
            config.get<string>('rule.baseline') ?? this.default.ruleBaseline;

        // Clear dirty settings flag
        this.pendingLoad = false;
    }
}

export const configuration = new ConfigurationManager();
