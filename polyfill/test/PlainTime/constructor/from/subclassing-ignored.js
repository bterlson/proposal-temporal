// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaintime.from
includes: [temporalHelpers.js]
---*/

TemporalHelpers.checkSubclassingIgnoredStatic(
  Temporal.PlainTime,
  "from",
  ["12:34:56.987654321"],
  (result) => TemporalHelpers.assertPlainTime(result, 12, 34, 56, 987, 654, 321),
);
