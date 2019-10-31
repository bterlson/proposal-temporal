#! /usr/bin/env -S node --experimental-modules

/*
 ** Copyright (C) 2018-2019 Bloomberg LP. All rights reserved.
 ** This code is governed by the license found in the LICENSE file.
 */

import Demitasse from '@pipobscure/demitasse';
const { describe, it, report } = Demitasse;

import Pretty from '@pipobscure/demitasse-pretty';
const { reporter } = Pretty;

import Assert from 'assert';
const { ok: assert, equal, throws } = Assert;

import { Absolute } from 'tc39-temporal';

describe('Absolute', () => {
  describe('Structure', () => {
    it('Absolute is a Function', () => {
      equal(typeof Absolute, 'function');
    });
    it('Absolute has a prototype', () => {
      assert(Absolute.prototype);
      equal(typeof Absolute.prototype, 'object');
    });
    describe('Absolute.prototype', () => {
      it('Absolute.prototype has getEpochSeconds', () => {
        assert('getEpochSeconds' in Absolute.prototype);
      });
      it('Absolute.prototype has getEpochMilliseconds', () => {
        assert('getEpochMilliseconds' in Absolute.prototype);
      });
      it('Absolute.prototype has getEpochMicroseconds', () => {
        assert('getEpochMicroseconds' in Absolute.prototype);
      });
      it('Absolute.prototype has getEpochNanoseconds', () => {
        assert('getEpochNanoseconds' in Absolute.prototype);
      });
      it('Absolute.prototype.toString is a Function', () => {
        equal(typeof Absolute.prototype.toString, 'function');
      });
      it('Absolute.prototype.toJSON is a Function', () => {
        equal(typeof Absolute.prototype.toJSON, 'function');
      });
    });
    it('Absolute.fromEpochSeconds is a Function', () => {
      equal(typeof Absolute.fromEpochSeconds, 'function');
    });
    it('Absolute.fromEpochMicroseconds is a Function', () => {
      equal(typeof Absolute.fromEpochMicroseconds, 'function');
    });
    it('Absolute.fromEpochMilliseconds is a Function', () => {
      equal(typeof Absolute.fromEpochMilliseconds, 'function');
    });
    it('Absolute.fromEpochNanoseconds is a Function', () => {
      equal(typeof Absolute.fromEpochNanoseconds, 'function');
    });
    it('Absolute.fromString is a Function', () => {
      equal(typeof Absolute.fromString, 'function');
    });
  });
  describe('Construction', () => {
    it('can construct', () => {
      const epochMillis = Date.UTC(1976, 10, 18, 14, 23, 30, 123);
      const epochNanos = BigInt(epochMillis) * BigInt(1e6) + BigInt(456789);
      const instant = new Absolute(epochNanos);
      assert(instant);
      equal(typeof instant, 'object');
      equal(instant.getEpochSeconds(), Math.floor(Date.UTC(1976, 10, 18, 14, 23, 30, 123) / 1e3), 'getEpochSeconds');
      equal(instant.getEpochMilliseconds(), Date.UTC(1976, 10, 18, 14, 23, 30, 123), 'getEpochMilliseconds');
    });
    it('throws on number', () => throws(() => new Absolute(1234)));
    it('throws on string', () => throws(() => new Absolute('1234')));
  });
  describe('absolute.toString() works', () => {
    it('`1976-11-18T14:23:30.123456789Z`.toString()', () => {
      const iso = '1976-11-18T14:23:30.123456789Z';
      const instant = Absolute.fromString(iso);
      assert(instant);
      equal(`${instant}`, iso);
    });
    it('`1963-02-13T09:36:29.123456789Z`.toString()', () => {
      const iso = '1963-02-13T09:36:29.123456789Z';
      const instant = Absolute.fromString(iso);
      assert(instant);
      equal(`${instant}`, iso);
    });
  });
  describe('Absolute.fromEpochSeconds() works', () => {
    it('1976-11-18T15:23:30', () => {
      const epochSeconds = Math.floor(Date.UTC(1976, 10, 18, 15, 23, 30, 123) / 1e3);
      const instant = Absolute.fromEpochSeconds(epochSeconds);
      equal(instant.getEpochSeconds(), epochSeconds);
    });
    it('1963-02-13T09:36:29', () => {
      const epochSeconds = Math.floor(Date.UTC(1963, 1, 13, 9, 36, 29, 123) / 1e3);
      const instant = Absolute.fromEpochSeconds(epochSeconds);
      equal(instant.getEpochSeconds(), epochSeconds);
    });
  });
  describe('Absolute.fromEpochMilliseconds() works', () => {
    it('1976-11-18T15:23:30.123', () => {
      const epochMilliseconds = Date.UTC(1976, 10, 18, 15, 23, 30, 123);
      const instant = Absolute.fromEpochMilliseconds(epochMilliseconds);
      equal(instant.getEpochMilliseconds(), epochMilliseconds);
    });
    it('1963-02-13T09:36:29.123', () => {
      const epochMilliseconds = Date.UTC(1963, 1, 13, 9, 36, 29, 123);
      const instant = Absolute.fromEpochMilliseconds(epochMilliseconds);
      equal(instant.getEpochMilliseconds(), epochMilliseconds);
    });
  });
  describe('Absolute.fromEpochMicroseconds() works', () => {
    it('1976-11-18T15:23:30.123456', () => {
      const epochMicroseconds = BigInt(Date.UTC(1976, 10, 18, 15, 23, 30, 123)) * BigInt(1e3) + BigInt(456);
      const instant = Absolute.fromEpochMicroseconds(epochMicroseconds);
      equal(instant.getEpochMicroseconds(), epochMicroseconds);
    });
    it('1963-02-13T09:36:29.123456', () => {
      const epochMicroseconds = BigInt(Date.UTC(1963, 1, 13, 9, 36, 29, 123)) * BigInt(1e3) + BigInt(456);
      const instant = Absolute.fromEpochMicroseconds(epochMicroseconds);
      equal(instant.getEpochMicroseconds(), epochMicroseconds);
    });
  });
  describe('Absolute.fromEpochNanoseconds() works', () => {
    it('1976-11-18T15:23:30.123456789', () => {
      const epochNanoseconds = BigInt(Date.UTC(1976, 10, 18, 15, 23, 30, 123)) * BigInt(1e6) + BigInt(456789);
      const instant = Absolute.fromEpochNanoseconds(epochNanoseconds);
      equal(instant.getEpochNanoseconds(), epochNanoseconds);
    });
    it('1963-02-13T09:36:29.123456789', () => {
      const epochNanoseconds = BigInt(Date.UTC(1963, 1, 13, 9, 36, 29, 123)) * BigInt(1e6) + BigInt(456789);
      const instant = Absolute.fromEpochNanoseconds(epochNanoseconds);
      equal(instant.getEpochNanoseconds(), epochNanoseconds);
    });
  });
  describe('Absolute.fromString() works', () => {
    it('1976-11-18T15:23Z', () => {
      equal(Absolute.fromString('1976-11-18T15:23Z').getEpochMilliseconds(), Date.UTC(1976, 10, 18, 15, 23));
    });
    it('1976-11-18T15:23:30Z', () => {
      equal(Absolute.fromString('1976-11-18T15:23:30Z').getEpochMilliseconds(), Date.UTC(1976, 10, 18, 15, 23, 30));
    });
    it('1976-11-18T15:23:30.123Z', () => {
      equal(
        Absolute.fromString('1976-11-18T15:23:30.123Z').getEpochMilliseconds(),
        Date.UTC(1976, 10, 18, 15, 23, 30, 123)
      );
    });
    it('1976-11-18T15:23:30.123456Z', () => {
      equal(
        Absolute.fromString('1976-11-18T15:23:30.123456Z').getEpochMicroseconds(),
        BigInt(Date.UTC(1976, 10, 18, 15, 23, 30, 123)) * BigInt(1e3) + BigInt(456)
      );
    });
    it('1976-11-18T15:23:30.123456789Z', () => {
      equal(
        Absolute.fromString('1976-11-18T15:23:30.123456789Z').getEpochNanoseconds(),
        BigInt(Date.UTC(1976, 10, 18, 15, 23, 30, 123)) * BigInt(1e6) + BigInt(456789)
      );
    });
  });
  describe('Absolute.plus() works', () => {
    const absolute = new Absolute(0n);
    it('absolute.plus({nanoseconds: 100n})', () => {
      equal(absolute.plus({ nanoseconds: 100n }).getEpochNanoseconds(), 100);
    });
    it('absolute.plus({microseconds: 100n})', () => {
      equal(absolute.plus({ microseconds: 100n }).getEpochNanoseconds(), 1e5);
    });
    it('absolute.plus({milliseconds: 100n})', () => {
      equal(absolute.plus({ milliseconds: 100n }).getEpochNanoseconds(), 1e8);
    });
  });
  describe('Absolute.minus() works', () => {
    const absolute = new Absolute(BigInt(1e8));
    it('absolute.minus({nanoseconds: 100n})', () => {
      equal(absolute.minus({ nanoseconds: 100n }).getEpochNanoseconds(), 1e8 - 100);
    });
    it('absolute.minus({microseconds: 100n})', () => {
      equal(absolute.minus({ microseconds: 100n }).getEpochNanoseconds(), 1e8 - 1e5);
    });
    it('absolute.minus({milliseconds: 100n})', () => {
      equal(absolute.minus({ milliseconds: 100n }).getEpochNanoseconds(), 0);
    });
  });
});

import { normalize } from 'path';
if (normalize(import.meta.url.slice(8)) === normalize(process.argv[1])) report(reporter);
