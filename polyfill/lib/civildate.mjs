/*
** Copyright (C) 2018 Bloomberg LP. All rights reserved.
** This code is governed by the license found in the LICENSE file.
*/

import { plus, pad, spad  } from './util.mjs';
import { CivilDateTime } from './civildatetime.mjs';

const DATA = Symbol('data');

export class CivilDate {
  constructor(years, months, days) {
    const { year, month, day } = plus({}, { years, months, days });
    this[DATA] = { year, month, day };
  }
  get [Symbol.toStringTag] () { return 'CivilDate'; }

  get year() { return this[DATA].year; }
  get month() { return this[DATA].month; }
  get day() { return this[DATA].day; }

  plus(data) {
    const { year, month, day } = plus(this, data);
    return new CivilDate(year, month, day);
  }
  with({ year = this.year, month = this.month , day = this.day } = {}) {
    return new CivilDate(year, month, day);
  }
  withTime(time) {
    return new CivilDateTime.from(this, time);
  }
  toString() {
    const { year, month, day } = this;
    return `${spad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
  }
  toJSON() { return this.toString(); }

  static fromString(string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(string);
    if (!match) {
      throw new Error(`invalid date-string: ${string}`);
    }
    return new CivilDate(+match[1], +match[2], +match[3]);
  }
  static fromMilliseconds(millis, zone) {
    return CivilDateTime.fromMilliseconds(millis, zone).toCivilDate();
  }
};
