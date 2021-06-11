// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaintime.prototype.subtract
includes: [propertyHelper.js]
features: [Temporal]
---*/

assert.sameValue(
  typeof Temporal.PlainTime.prototype.subtract,
  "function",
  "`typeof PlainTime.prototype.subtract` is `function`"
);

verifyProperty(Temporal.PlainTime.prototype, "subtract", {
  writable: true,
  enumerable: false,
  configurable: true,
});
