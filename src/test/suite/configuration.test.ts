// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from 'assert/strict';
import { configuration, ConfigurationManager, ISetting, OutputAs } from '../../configuration';

suite('ConfigurationManager tests', () => {
    test('Defaults', () => {
        const config = new ConfigurationManager(undefined);

        assert.strictEqual(config.get().codeLensRuleDocumentationLinks, false);
        assert.strictEqual(config.get().documentationCustomSnippetPath, undefined);
        assert.strictEqual(config.get().documentationLocalePath, 'en');
        assert.strictEqual(config.get().documentationPath, undefined);
        assert.strictEqual(config.get().documentationSnippet, 'Rule Doc');
        assert.strictEqual(config.get().executionNotProcessedWarning, false);
        assert.strictEqual(config.get().experimentalEnabled, false);
        assert.strictEqual<OutputAs>(config.get().outputAs, OutputAs.Summary);
        assert.strictEqual(config.get().notificationsShowChannelUpgrade, true);
        assert.strictEqual(config.get().notificationsShowPowerShellExtension, true);
    });

    test('With experimental', () => {
        const setting: ISetting = { ...configuration.get() };
        setting.experimentalEnabled = true;
        const config = new ConfigurationManager(setting);

        assert.strictEqual(config.get().codeLensRuleDocumentationLinks, true);
        assert.strictEqual(config.get().documentationCustomSnippetPath, undefined);
        assert.strictEqual(config.get().documentationLocalePath, 'en');
        assert.strictEqual(config.get().documentationPath, undefined);
        assert.strictEqual(config.get().documentationSnippet, 'Rule Doc');
        assert.strictEqual(config.get().executionNotProcessedWarning, false);
        assert.strictEqual(config.get().experimentalEnabled, true);
        assert.strictEqual<OutputAs>(config.get().outputAs, OutputAs.Summary);
        assert.strictEqual(config.get().notificationsShowChannelUpgrade, true);
        assert.strictEqual(config.get().notificationsShowPowerShellExtension, true);
    });
});
