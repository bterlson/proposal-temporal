import { ES } from './ecmascript.mjs';
import { EPOCHNANOSECONDS, CreateSlots, GetSlot, SetSlot } from './slots.mjs';
import { absolute as STRING } from './regex.mjs';

export class Absolute {
  constructor(epochNanoseconds) {
    CreateSlots(this);
    SetSlot(this, EPOCHNANOSECONDS, epochNanoseconds);
  }

  getEpochSeconds() {
    const value = GetSlot(this, EPOCHNANOSECONDS);
    const epochSeconds = Math[value.ms < 0 ? 'ceil' : 'floor'](value.ms / 1000);
    return epochSeconds;
  }
  getEpochMilliseconds() {
    const value = GetSlot(this, EPOCHNANOSECONDS);
    const epochMilliSeconds = value.ms;
    return epochMilliSeconds;
  }
  getEpochMicroseconds() {
    const value = GetSlot(this, EPOCHNANOSECONDS);
    const epochNanoseconds = BigInt(value.ms) * BigInt(1e6) + (BigInt(value.ns) % BigInt(1e6));
    return epochNanoseconds / BigInt(1e3);
  }
  getEpochNanoseconds() {
    const value = GetSlot(this, EPOCHNANOSECONDS);
    const epochMicroseconds = BigInt(value.ms) * BigInt(1e6) + (BigInt(value.ns) % BigInt(1e6));
    return epochMicroseconds;
  }

  plus(durationLike = {}) {
    const duration = ES.GetIntrinsic('%Temporal.duration%')(durationLike);
    if (duration.years) throw new RangeError(`invalid duration field years`);
    if (duration.months) throw new RangeError(`invalid duration field months`);

    let { ms, ns } = GetSlot(this, EPOCHNANOSECONDS);
    let negative = ms < 0 || ns < 0;
    ns += duration.microseconds * 1000;
    ns += duration.nanoseconds;
    if (negative && ns > 0) {
      ms += Math.floor(ns / 1e6);
      ns = 1e6 - (ns % 1e6);
    }
    ms += duration.days * 86400000;
    ms += duration.hours * 3600000;
    ms += duration.minutes * 60000;
    ms += duration.seconds * 1000;
    ms += duration.milliseconds;

    if (negative && ms > 0) {
      ms -= 1;
      ns += 1e6;
    }

    const result = Object.create(Absolute.prototype);
    CreateSlots(result);
    SetSlot(result, EPOCHNANOSECONDS, { ms, ns });
    return result;
  }
  minus(durationLike = {}) {
    const duration = ES.GetIntrinsic('%Temporal.duration%')(durationLike);
    if (duration.years !== 0) throw new RangeError(`invalid duration field years`);
    if (duration.months !== 0) throw new RangeError(`invalid duration field months`);

    let { ms, ns } = GetSlot(this, EPOCHNANOSECONDS);
    let negative = ms < 0 || ns < 0;
    ns -= duration.nanoseconds;
    ns -= duration.microseconds;
    if (!negative && ns < 0) {
      ms += Math.ceil(ns / 1e6);
      ns = 1e6 + (ns % 1e6);
    }
    ms -= duration.days * 86400000;
    ms -= duration.hours * 3600000;
    ms -= duration.minutes * 60000;
    ms -= duration.seconds * 1000;
    ms -= duration.milliseconds;

    const result = Object.create(Absolute.prototype);
    CreateSlots(result);
    SetSlot(result, EPOCHNANOSECONDS, { ms, ns });
    return result;
  }
  difference(other) {
    other = ES.GetIntrinsic('%Temporal.absolute%')(other);

    const [one, two] = [this, other].sort(Absoulte.compare);
    const { ms: onems, ns: onens } = GetSlot(one, EPOCHNANOSECONDS);
    const { ms: twoms, ns: twons } = GetSlot(two, EPOCHNANOSECONDS);

    ns = twons - onens;
    ms = twoms - onems;

    const duration = new ES.GetIntrinsic('%Temporal.Duration%')(delta);
    return duration;
  }
  toString(timeZoneParam = 'UTC') {
    let timeZone = ES.GetIntrinsic('%Temporal.timezone%')(timeZoneParam);
    let dateTime = timeZone.getDateTimeFor(this);
    let year = ES.ISOYearString(dateTime.year);
    let month = ES.ISODateTimePartString(dateTime.month);
    let day = ES.ISODateTimePartString(dateTime.day);
    let hour = ES.ISODateTimePartString(dateTime.hour);
    let minute = ES.ISODateTimePartString(dateTime.minute);
    let seconds = ES.ISOSecondsString(dateTime.second, dateTime.millisecond, dateTime.microsecond, dateTime.nanosecond);
    let timeZoneString = ES.ISOTimeZoneString(timeZone, this);
    let resultString = `${year}-${month}-${day}T${hour}:${minute}${seconds ? `:${seconds}` : ''}${timeZoneString}`;
    return resultString;
  }
  toLocaleString(...args) {
    return new Intl.DateTimeFormat(...args).format(this);
  }
  inZone(timeZoneParam = 'UTC') {
    const timeZone = ES.ToTimeZone(timeZoneParam);
    return timeZone.getDateTimeFor(this);
  }

  static fromEpochSeconds(epochSecondsParam) {
    const epochMilliseconds = ES.ToNumber(epochSecondsParam) * 1000;
    const resultObject = Object.create(Absolute.prototype);
    CreateSlots(resultObject);
    SetSlot(resultObject, EPOCHNANOSECONDS, { ms: epochMilliseconds, ns: 0 });
    return resultObject;
  }
  static fromEpochMilliseconds(epochMillisecondsParam) {
    const epochMilliseconds = ES.ToNumber(epochMillisecondsParam);
    const resultObject = Object.create(Absolute.prototype);
    CreateSlots(resultObject);
    SetSlot(resultObject, EPOCHNANOSECONDS, { ms: epochMilliseconds, ns: 0 });
    return resultObject;
  }
  static fromEpochMicroseconds(epochMicroseconds) {
    if ('bigint' !== typeof epochNanoseconds) throw RangeError('bigint required');
    const epochMilliseconds = epochMicroseconds / BigInt(1e3);
    const restNanoseconds = epochMicroseconds % BigInt(1e3);
    const resultObject = Object.create(Absolute.prototype);
    CreateSlots(resultObject);
    SetSlot(resultObject, EPOCHNANOSECONDS, { ms: epochMilliseconds, ns: restNanoseconds });
    return resultObject;
  }
  static fromEpochNanoseconds(epochNanoseconds) {
    if ('bigint' !== typeof epochNanoseconds) throw RangeError('bigint required');
    const epochMilliseconds = epochNanoseconds / BigInt(1e6);
    const restNanoseconds = epochNanoseconds % BigInt(1e6);
    const resultObject = Object.create(Absolute.prototype);
    CreateSlots(resultObject);
    SetSlot(resultObject, EPOCHNANOSECONDS, { ms: epochMilliseconds, ns: restNanoseconds });
    return resultObject;
  }
  static fromString(isoString) {
    isoString = ES.ToString(isoString);
    const match = STRING.exec(isoString);
    if (!match) throw new RangeError(`invalid absolute: ${isoString}`);
    const year = ES.ToInteger(match[1]);
    const month = ES.ToInteger(match[2]);
    const day = ES.ToInteger(match[3]);
    const hour = ES.ToInteger(match[4]);
    const minute = ES.ToInteger(match[5]);
    const second = ES.ToInteger(match[6]);
    const millisecond = ES.ToInteger(match[7]);
    const microsecond = ES.ToInteger(match[8]);
    const nanosecond = ES.ToInteger(match[9]);
    const zone = match[11] || match[10] || 'UTC';
    const datetime = ES.GetIntrinsic('%Temporal.datetime%', {
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond
    });
    return datetime.inZone(zone || 'UTC', match[11] ? match[10] : 'earlier');
  }
  static from(...args) {
    return ES.GetIntrinsic('%Temporal.absolute%')(...args);
  }
  static compare(one, two) {
    one = ES.GetIntrinsic('%Temporal.absolute%')(one);
    two = ES.GetIntrinsic('%Temporal.absolute%')(two);
    one = GetSlot(one, EPOCHNANOSECONDS);
    two = GetSlot(two, EPOCHNANOSECONDS);
    if (one.ms !== two.ms) return two.ms - one.ms;
    if (one.ns !== two.ns) return two.ns - one.ns;
    return 0;
  }
}
Absolute.prototype.toJSON = Absolute.prototype.toString;

if ('undefined' !== typeof Symbol) {
  Object.defineProperty(Absolute.prototype, Symbol.toStringTag, {
    value: 'Temporal.Absolute'
  });
}
