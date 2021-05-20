// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from 'assert';
import { configuration } from '../../configuration';

suite('ConfigurationManager tests', () => {
    test('Defaults', () => {
        assert.strictEqual(configuration.get().executionNotProcessedWarning, false);
        assert.strictEqual(configuration.get().outputAs, 'Summary');
    });
});
