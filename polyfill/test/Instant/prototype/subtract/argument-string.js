// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.instant.prototype.subtract
---*/

const instance = Temporal.Instant.fromEpochSeconds(10);
const result = instance.subtract("PT3H");
assert.sameValue(result.epochNanoseconds, -10_790_000_000_000n, "epochNanoseconds result");
