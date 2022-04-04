# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

#
# Example validation rules
#

# Description: Redis Cache should only accept secure connections
Rule 'redis.NonSslPort' -If { ResourceType 'Microsoft.Cache/Redis' } {
    $TargetObject.properties.enableNonSslPort -eq $False
}

# Synopsis: Redis Cache should reject TLS versions older then 1.2
Rule 'redis.MinTLS' -Type 'Microsoft.Cache/Redis' { # Synopsis: ddd
    Recommend 'Enforce TLS 1.2 unless required to support older tools.'

    # Check that TLS is within range
    Within 'properties.minimumTlsVersion' '1.2'
}
