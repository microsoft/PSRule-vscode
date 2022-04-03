// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from 'assert';
import { configuration, OutputAs } from '../../configuration';

suite('ConfigurationManager tests', () => {
    test('Defaults', () => {
        assert.strictEqual(configuration.get().executionNotProcessedWarning, false);
        assert.strictEqual(configuration.get().experimentalEnabled, false);
        assert.strictEqual(configuration.get().outputAs, OutputAs.Summary);
        assert.strictEqual(configuration.get().notificationsShowChannelUpgrade, true);
        assert.strictEqual(configuration.get().notificationsShowPowerShellExtension, true);
    });
});
