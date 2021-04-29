// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.zoneddatetime.prototype.since
description: Fallback value for smallestUnit option
includes: [temporalHelpers.js]
---*/

const earlier = new Temporal.ZonedDateTime(1_000_000_000_000_000_000n, "UTC");
const later = new Temporal.ZonedDateTime(1_000_090_061_987_654_321n, "UTC");

const explicit = later.since(earlier, { smallestUnit: undefined });
TemporalHelpers.assertDuration(explicit, 0, 0, 0, 0, 25, 1, 1, 987, 654, 321, "default smallestUnit is nanosecond");
const implicit = later.since(earlier, {});
TemporalHelpers.assertDuration(implicit, 0, 0, 0, 0, 25, 1, 1, 987, 654, 321, "default smallestUnit is nanosecond");
