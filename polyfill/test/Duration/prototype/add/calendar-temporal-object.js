// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.duration.prototype.add
description: Fast path for converting other Temporal objects to Temporal.Calendar by reading internal slots
info: |
    sec-temporal.duration.prototype.add step 5:
      5. Let _relativeTo_ be ? ToRelativeTemporalObject(_options_).
    sec-temporal-torelativetemporalobject step 4.b:
      b. Let _calendar_ be ? GetOptionalTemporalCalendar(_value_).
    sec-temporal-getoptionaltemporalcalendar step 2:
      2. Return ? ToOptionalTemporalCalendar(_calendar_).
    sec-temporal-tooptionaltemporalcalendar step 2:
      3. Return ? ToTemporalCalendar(_temporalCalendarLike_).
    sec-temporal-totemporalcalendar step 1.a:
      a. If _temporalCalendarLike_ has an [[InitializedTemporalDate]], [[InitializedTemporalDateTime]], [[InitializedTemporalMonthDay]], [[InitializedTemporalYearMonth]], or [[InitializedTemporalZonedDateTime]] internal slot, then
        i. Return _temporalCalendarLike_.[[Calendar]].
includes: [compareArray.js, temporalHelpers.js]
---*/

TemporalHelpers.checkToTemporalCalendarFastPath((temporalObject) => {
  const duration1 = new Temporal.Duration(1);
  const duration2 = new Temporal.Duration(0, 12);
  duration1.add(duration2, { relativeTo: { year: 2000, month: 1, day: 1, calendar: temporalObject } });
});
