// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.now.plaindateiso
includes: [compareArray.js]
---*/

const actual = [];
const expected = [];

Object.defineProperty(Temporal.TimeZone, "from", {
  get() {
    actual.push("get Temporal.TimeZone.from");
    return undefined;
  },
});

const resultExplicit = Temporal.now.plainDateISO(undefined);
assert(resultExplicit instanceof Temporal.PlainDate);

assert.compareArray(actual, expected, "Temporal.TimeZone.from should not be called");

const resultImplicit = Temporal.now.plainDateISO();
assert(resultImplicit instanceof Temporal.PlainDate);

assert.compareArray(actual, expected, "Temporal.TimeZone.from should not be called");
