// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindatetime.prototype.round
includes: [propertyHelper.js]
features: [Temporal]
---*/

assert.sameValue(
  typeof Temporal.PlainDateTime.prototype.round,
  "function",
  "`typeof PlainDateTime.prototype.round` is `function`"
);

verifyProperty(Temporal.PlainDateTime.prototype, "round", {
  writable: true,
  enumerable: false,
  configurable: true,
});