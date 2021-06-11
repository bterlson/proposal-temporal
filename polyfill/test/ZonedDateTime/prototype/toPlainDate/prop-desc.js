// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.zoneddatetime.prototype.toplaindate
includes: [propertyHelper.js]
features: [Temporal]
---*/

assert.sameValue(
  typeof Temporal.ZonedDateTime.prototype.toPlainDate,
  "function",
  "`typeof ZonedDateTime.prototype.toPlainDate` is `function`"
);

verifyProperty(Temporal.ZonedDateTime.prototype, "toPlainDate", {
  writable: true,
  enumerable: false,
  configurable: true,
});
