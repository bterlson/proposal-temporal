// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.instant.fromepochmicroseconds
---*/

let called = false;

class MyInstant extends Temporal.Instant {
  constructor(ns) {
    assert.sameValue(ns, 10_000n, "constructor argument");
    called = true;
    super(ns);
  }
}

const result = MyInstant.fromEpochMicroseconds(10n);
assert.sameValue(result.getEpochNanoseconds(), 10_000n, "getEpochNanoseconds result");
assert.sameValue(called, true);
assert.sameValue(Object.getPrototypeOf(result), MyInstant.prototype);
