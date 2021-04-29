// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.zoneddatetime.prototype.tostring
description: RangeError thrown when roundingMode option not one of the allowed string values
---*/

const datetime = new Temporal.ZonedDateTime(1_000_000_000_123_987_500n, "UTC");
assert.throws(RangeError, () => datetime.toString({ smallestUnit: "microsecond", roundingMode: "other string" }));
