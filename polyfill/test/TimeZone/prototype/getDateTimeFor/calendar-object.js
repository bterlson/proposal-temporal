// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.absolute.prototype.todatetime
includes: [compareArray.js]
---*/

const actual = [];
const expected = [
  "get timeZone.getDateTimeFor",
  "call timeZone.getDateTimeFor",
];

const absolute = Temporal.Absolute.from("1975-02-02T14:25:36.123456789Z");
const dateTime = Temporal.DateTime.from("1963-07-02T12:34:56.987654321");
const calendar = {};
const timeZone = new Proxy({
  getDateTimeFor(absolute, calendarArg) {
    actual.push("call timeZone.getDateTimeFor");
    assert.sameValue(absolute instanceof Temporal.Absolute, true, "Absolute");
    assert.sameValue(calendarArg, calendar);
    return dateTime;
  },
}, {
  has(target, property) {
    actual.push(`has timeZone.${property}`);
    return property in target;
  },
  get(target, property) {
    actual.push(`get timeZone.${property}`);
    return target[property];
  },
});

Object.defineProperty(Temporal.Calendar, "from", {
  get() {
    actual.push("get Temporal.Calendar.from");
    return undefined;
  },
});

const result = timeZone.getDateTimeFor(absolute, calendar);
assert.sameValue(result, dateTime);

assert.compareArray(actual, expected);
