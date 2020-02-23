import Demitasse from '@pipobscure/demitasse';
const { describe, it, report } = Demitasse;

import Pretty from '@pipobscure/demitasse-pretty';
const { reporter } = Pretty;

import { strict as assert } from 'assert';
const { throws, equal } = assert;

import { Duration } from 'tc39-temporal';

describe('Duration', () => {
  describe('Construction', () => {
    describe('Disambiguation', () => {
      it('negative values throw when "reject"', () =>
        throws(() => new Duration(-1, -1, -1, -1, -1, -1, -1, -1, -1, 'reject'), RangeError));
      it('negative values invert when "constrain"', () =>
        equal(`${new Duration(-1, -1, -1, -1, -1, -1, -1, -1, -1, 'constrain')}`, 'P1Y1M1DT1H1M1.001001001S'));
      it('excessive values balance when "balance"', () => {
        equal(`${new Duration(0, 0, 0, 0, 0, 0, 0, 0, 1000, 'balance')}`, 'PT0.000001S');
        equal(`${new Duration(0, 0, 0, 0, 0, 2 * 86400, 0, 0, 0, 'balance')}`, 'P2D');
      });
      it('throw when bad disambiguation', () =>
        throws(() => new Duration(0, 0, 0, 0, 0, 0, 0, 0, 0, 'xyz'), TypeError));
    });
  });
  describe('from()', () => {
    it(`Duration.from(P5Y) == P5Y`, () => {
      const orig = new Duration(5);
      const from = Duration.from(orig);
      equal(from, orig);
    });
    it(`Duration.from({ milliseconds: 5 }) == PT0.005S`, () => equal(`${ Duration.from({ milliseconds: 5 }) }`, 'PT0.005S'));
    it(`Duration.from("P1D") == P1D`, () => equal(`${ Duration.from("P1D") }`, 'P1D'));
    it('Duration.from({}) throws', () => throws(() => Duration.from({}), RangeError));
  });
  describe('toString()', () => {
    it('excessive sub-second units balance themselves when serializing', () => {
      equal(`${Duration.from({ milliseconds: 3500 })}`, 'PT3.500S');
      equal(`${Duration.from({ microseconds: 3500 })}`, 'PT0.003500S');
      equal(`${Duration.from({ nanoseconds: 3500 })}`, 'PT0.000003500S');
      equal(`${new Duration(0, 0, 0, 0, 0, 0, 1111, 1111, 1111, 'reject')}`, 'PT1.112112111S');
      equal(`${Duration.from({ seconds: 120, milliseconds: 3500 })}`, 'PT123.500S');
    });
  });
});

import { normalize } from 'path';
if (normalize(import.meta.url.slice(8)) === normalize(process.argv[1])) {
  report(reporter).then((failed) => process.exit(failed ? 1 : 0));
}
