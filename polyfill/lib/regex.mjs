const yearpart = /(?:[+-]\d{6}|\d{4})/;
const datesplit = new RegExp(`(${yearpart.source})(?:-(\\d{2})-(\\d{2})|(\\d{2})(\\d{2}))`);
const timesplit = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)/;
const zonesplit = /(?:(Z)|(?:([+-]\d{2})(?::?(\d{2}))?(?:\[([^\]\s]+)\])?))/i;

export const absolute = new RegExp(`^${datesplit.source}(?:T|\\s+)${timesplit.source}${zonesplit.source}$`, 'i');
export const datetime = new RegExp(
  `^${datesplit.source}(?:(?:T|\\s+)${timesplit.source}(?:${zonesplit.source})?)?$`,
  'i'
);

export const time = new RegExp(`^${timesplit.source}(?:${zonesplit.source})?$`, 'i');
// YYYYMM forbidden by ISO 8601, but since it is not ambiguous with anything
// else we could parse in a YearMonth context, we allow it
export const yearmonth = new RegExp(`^(${yearpart.source})-?(\\d{2})$`);
export const monthday = /^(\d{2})-?(\d{2})$/;

export const offset = /([+-])([0-2][0-9])(?::?([0-5][0-9]))?/;
export const duration = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:[.,](\d{1,9}))?S)?)?/i;
