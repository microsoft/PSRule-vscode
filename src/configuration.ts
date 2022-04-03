// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

import { ConfigurationChangeEvent, ExtensionContext, workspace } from 'vscode';
import { configurationItemPrefix } from './consts';

/**
 * The output of analysis tasks.
 */
export enum OutputAs {
    Detail = 0,
    Summary = 1,
}

/**
 * PSRule extension settings.
 */
export interface ISetting {
    executionNotProcessedWarning: boolean;
    experimentalEnabled: boolean;
    outputAs: OutputAs;
    notificationsShowChannelUpgrade: boolean;
    notificationsShowPowerShellExtension: boolean;
}

/**
 * Default configuration for PSRule extension settings.
 */
const globalDefaults: ISetting = {
    executionNotProcessedWarning: false,
    experimentalEnabled: false,
    outputAs: OutputAs.Summary,
    notificationsShowChannelUpgrade: true,
    notificationsShowPowerShellExtension: true,
};

/**
 * A configuration manager class for PSRule.
 */
export class ConfigurationManager {
    private current: ISetting;
    private readonly default: ISetting;

    /**
     * A flag for when setting require reload.
     */
    private pendingLoad: boolean = true;

    constructor(setting?: ISetting) {
        this.default = setting ?? globalDefaults;
        this.current = this.default;
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
        if (!e.affectsConfiguration(configurationItemPrefix)) {
            return;
        }
        this.pendingLoad = true;
    }

    private loadSettings(): void {
        const config = workspace.getConfiguration(configurationItemPrefix);

        // Read settings
        this.current.executionNotProcessedWarning =
            config.get<boolean>('execution.notProcessedWarning') ??
            this.default.executionNotProcessedWarning;

        this.current.experimentalEnabled =
            config.get<boolean>('experimental.enabled') ?? this.default.experimentalEnabled;

        this.current.outputAs = config.get<OutputAs>('output.as') ?? this.default.outputAs;

        this.current.notificationsShowChannelUpgrade =
            config.get<boolean>('notifications.showChannelUpgrade') ??
            this.default.notificationsShowChannelUpgrade;

        this.current.notificationsShowPowerShellExtension =
            config.get<boolean>('notifications.showPowerShellExtension') ??
            this.default.notificationsShowPowerShellExtension;

        // Clear dirty settings flag
        this.pendingLoad = false;
    }
}

export const configuration = new ConfigurationManager();
