// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindatetime
includes: [compareArray.js, temporalHelpers.js]
---*/

const actual = [];
const expected = [
  "get (argument 0).valueOf",
  "call (argument 0).valueOf",
  "get (argument 1).valueOf",
  "call (argument 1).valueOf",
  "get (argument 2).valueOf",
  "call (argument 2).valueOf",
  "get (argument 3).valueOf",
  "call (argument 3).valueOf",
  "get (argument 4).valueOf",
  "call (argument 4).valueOf",
  "get (argument 5).valueOf",
  "call (argument 5).valueOf",
  "get (argument 6).valueOf",
  "call (argument 6).valueOf",
  "get (argument 7).valueOf",
  "call (argument 7).valueOf",
  "get (argument 8).valueOf",
  "call (argument 8).valueOf",
];

const dateTimeArgs = [2020, 12, 24, 12, 34, 56, 123, 456, 789].map((value, idx) =>
  TemporalHelpers.toPrimitiveObserver(actual, value, `(argument ${idx})`));

const dateTime = new Temporal.PlainDateTime(...dateTimeArgs, "iso8601");
assert.compareArray(actual, expected);

assert.sameValue(dateTime.year, 2020);
assert.sameValue(dateTime.month, 12);
assert.sameValue(dateTime.day, 24);
assert.sameValue(dateTime.hour, 12);
assert.sameValue(dateTime.minute, 34);
assert.sameValue(dateTime.second, 56);
assert.sameValue(dateTime.millisecond, 123);
assert.sameValue(dateTime.microsecond, 456);
assert.sameValue(dateTime.nanosecond, 789);
assert.sameValue(dateTime.calendar.id, "iso8601");
