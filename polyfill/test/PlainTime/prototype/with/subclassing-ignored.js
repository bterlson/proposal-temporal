// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaintime.prototype.with
includes: [temporalHelpers.js]
---*/

TemporalHelpers.checkSubclassingIgnored(
  Temporal.PlainTime,
  [12, 34, 56, 987, 654, 321],
  "with",
  [{ nanosecond: 1 }],
  (result) => TemporalHelpers.assertPlainTime(result, 12, 34, 56, 987, 654, 1),
);
