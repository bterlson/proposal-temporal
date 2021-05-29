// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindatetime.prototype.round
includes: [temporalHelpers.js]
---*/

TemporalHelpers.checkSubclassingIgnored(
  Temporal.PlainDateTime,
  [2000, 5, 2, 12, 34, 56, 987, 654, 321],
  "round",
  [{ smallestUnit: 'second' }],
  (result) => TemporalHelpers.assertPlainDateTime(result, 2000, 5, "M05", 2, 12, 34, 57, 0, 0, 0),
);
