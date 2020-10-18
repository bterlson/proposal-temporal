// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.instant.prototype.add
---*/

const instance = Temporal.Instant.fromEpochSeconds(10);
const result = instance.add("PT3H");
assert.sameValue(result.epochNanoseconds, 10_810_000_000_000n, "epochNanoseconds result");
