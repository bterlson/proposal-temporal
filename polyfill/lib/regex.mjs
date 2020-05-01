const yearpart = /(?:[+-]\d{6}|\d{4})/;
const datesplit = new RegExp(`(${yearpart.source})-(\\d{2})-(\\d{2})`);
const timesplit = /(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3})(\d{3})?(\d{3})?)?)?/;
const zonesplit = /(?:(Z)|(?:([+-]\d{2})(?::?(\d{2}))?(?:\[([^\]\s]+)\])?))/;

export const absolute = new RegExp(`^((${datesplit.source})(?:T|\\s+)(${timesplit.source}))${zonesplit.source}$`);
export const datetime = new RegExp(`^${datesplit.source}(?:(?:T|\\s+)${timesplit.source}(?:${zonesplit.source})?)?$`);

export const time = new RegExp(`^${timesplit.source}(?:${zonesplit.source})?$`);
export const yearmonth = new RegExp(`^(${yearpart.source})-(\\d{2})$`);
export const monthday = /^(\d{2})-(\d{2})$/;

export const offset = /([+-])([0-2][0-9])(?::?([0-5][0-9]))?/;
export const duration = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d{3})(\d{3})?(\d{3})?)?S)?)?/;
