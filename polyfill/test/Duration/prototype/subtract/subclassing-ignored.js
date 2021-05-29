// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.duration.prototype.subtract
includes: [temporalHelpers.js]
---*/

TemporalHelpers.checkSubclassingIgnored(
  Temporal.Duration,
  [0, 0, 0, 4, 5, 6, 7, 987, 654, 321],
  "subtract",
  [{ nanoseconds: 1 }],
  (result) => TemporalHelpers.assertDuration(result, 0, 0, 0, 4, 5, 6, 7, 987, 654, 320),
);
