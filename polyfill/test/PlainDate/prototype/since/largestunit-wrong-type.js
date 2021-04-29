// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.since
description: Type conversions for largestUnit option
includes: [compareArray.js, temporalHelpers.js]
---*/

const earlier = new Temporal.PlainDate(2000, 5, 2);
const later = new Temporal.PlainDate(2001, 6, 3);
TemporalHelpers.checkStringOptionWrongType("largestUnit", "year",
  (largestUnit) => later.since(earlier, { largestUnit }),
  (result, descr) => TemporalHelpers.assertDuration(result, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, descr),
);
