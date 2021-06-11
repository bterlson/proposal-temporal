// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.add
includes: [propertyHelper.js]
features: [Temporal]
---*/

assert.sameValue(
  typeof Temporal.PlainDate.prototype.add,
  "function",
  "`typeof Date.prototype.add` is `function`"
);

verifyProperty(Temporal.PlainDate.prototype, "add", {
  writable: true,
  enumerable: false,
  configurable: true,
});
