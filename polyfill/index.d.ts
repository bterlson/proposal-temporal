export namespace Temporal {
  export type ComparisonResult = -1 | 0 | 1;

  /**
   * Options for assigning fields using `with()` or entire objects with
   * `from()`.
   * */
  export type AssignmentOptions = {
    /**
     * How to deal with out-of-range values
     *
     * - In `'constrain'` mode, out-of-range values are clamped to the nearest
     *   in-range value.
     * - In `'balance'` mode, out-of-range values are resolved by balancing them
     *   with the next highest unit.
     * - In `'reject'` mode, out-of-range values will cause the function to
     *   throw a RangeError.
     *
     * The default is `'constrain'`.
     */
    disambiguation: 'constrain' | 'balance' | 'reject';
  };

  /**
   * Options for conversions of `Temporal.DateTime` to `Temporal.Absolute`
   * */
  export type ToAbsoluteOptions = {
    /**
     * Controls handling of invalid or ambiguous times caused by time zone
     * offset changes like Daylight Saving time (DST) transitions.
     *
     * This option is only relevant if a `DateTime` value does not exist in the
     * destination time zone (e.g. near "Spring Forward" DST transitions), or
     * exists more than once (e.g. near "Fall Back" DST transitions).
     *
     * In case of ambiguous or non-existent times, this option controls what
     * absolute time to return:
     * - `'earlier'`: The earlier time of two possible times
     * - `'later'`: The later of two possible times
     * - `'reject'`: Throw a RangeError instead.
     *
     * The default is `'earlier'`.
     *
     * Compatibility Note: the legacy `Date` object (and libraries like
     * moment.js and Luxon) gives the same result as `earlier` when turning the
     * clock back, and `later` when setting the clock forward.
     *
     * */
    disambiguation: 'earlier' | 'later' | 'reject';
  };

  /**
   * Options for arithmetic operations like `plus()` and `minus()`
   * */
  export type ArithmeticOptions = {
    /**
     * Controls handling of out-of-range arithmetic results.
     *
     * If a result is out of range, then `'constrain'` will clamp the result to
     * the allowed range, while `'reject'` will throw a RangeError.
     *
     * The default is `'constrain'`.
     */
    disambiguation: 'constrain' | 'reject';
  };

  /**
   * Options to control `Duration.prototype.minus()` behavior
   * */
  export type DurationMinusOptions = {
    /**
     * Controls how to deal with subtractions that result in negative overflows
     *
     * In `'balanceConstrain'` mode, negative fields are balanced with the next
     * highest field so that none of the fields are negative in the result. If
     * this is not possible, a `RangeError` is thrown.
     *
     * In `'balance'` mode, all fields are balanced with the next highest field,
     * no matter if they are negative or not.
     *
     * The default is `'balanceConstrain'`.
     */
    disambiguation: 'balanceConstrain' | 'balance';
  };

  export interface DifferenceOptions<T extends string> {
    /**
     * The largest unit to allow in the resulting `Temporal.Duration` object.
     *
     * Valid values may include `'years'`, `'months'`, `'days'`, `'hours'`,
     * `'minutes'`, and `'seconds'`, although some types may throw an exception
     * if a value is used that would produce an invalid result. For example,
     * `hours` is not accepted by `Date.prototype.difference()`.
     *
     * The default depends on the type being used.
     */
    largestUnit: T;
  }

  export type DurationLike = {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
  };
  /**
   *
   * A `Temporal.Duration` represents an immutable duration of time which can be
   * used in date/time arithmetic.
   *
   * See https://tc39.es/proposal-temporal/docs/duration.html for more details.
   */
  export class Duration implements Required<DurationLike> {
    static from(item: Temporal.Duration | DurationLike | string, options?: AssignmentOptions): Temporal.Duration;
    constructor(
      years?: number,
      months?: number,
      weeks?: number,
      days?: number,
      hours?: number,
      minutes?: number,
      seconds?: number,
      milliseconds?: number,
      microseconds?: number,
      nanoseconds?: number
    );
    readonly years: number;
    readonly months: number;
    readonly weeks: number;
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly milliseconds: number;
    readonly microseconds: number;
    readonly nanoseconds: number;
    with(durationLike: DurationLike, options: AssignmentOptions): Temporal.Duration;
    plus(other: Temporal.Duration | DurationLike, options: ArithmeticOptions): Temporal.Duration;
    minus(other: Temporal.Duration | DurationLike, options: DurationMinusOptions): Temporal.Duration;
    getFields(): Required<DurationLike>;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(): string;
  }

  /**
   * A `Temporal.Absolute` is an absolute point in time, with a precision in
   * nanoseconds. No time zone or calendar information is present. Therefore,
   * `Temporal.Absolute` has no concept of days, months, or even hours.
   *
   * For convenience of interoperability, it internally uses nanoseconds since
   * the {@link https://en.wikipedia.org/wiki/Unix_time|Unix epoch} (midnight
   * UTC on January 1, 1970). However, a `Temporal.Absolute` can be created from
   * any of several expressions that refer to a single point in time, including
   * an {@link https://en.wikipedia.org/wiki/ISO_8601|ISO 8601 string} with a
   * time zone offset such as '2020-01-23T17:04:36.491865121-08:00'.
   *
   * See https://tc39.es/proposal-temporal/docs/absolute.html for more details.
   */
  export class Absolute {
    static fromEpochSeconds(epochSeconds: number): Temporal.Absolute;
    static fromEpochMilliseconds(epochMilliseconds: number): Temporal.Absolute;
    static fromEpochMicroseconds(epochMicroseconds: bigint): Temporal.Absolute;
    static fromEpochNanoseconds(epochNanoseconds: bigint): Temporal.Absolute;
    static from(item: Temporal.Absolute | string): Temporal.Absolute;
    static compare(one: Temporal.Absolute, two: Temporal.Absolute): ComparisonResult;
    constructor(epochNanoseconds: bigint);
    getEpochSeconds(): number;
    getEpochMilliseconds(): number;
    getEpochMicroseconds(): bigint;
    getEpochNanoseconds(): bigint;
    equals(other: Temporal.Absolute): boolean;
    plus(durationLike: Temporal.Duration | DurationLike): Temporal.Absolute;
    minus(durationLike: Temporal.Duration | DurationLike): Temporal.Absolute;
    difference(
      other: Temporal.Absolute,
      options?: DifferenceOptions<'days' | 'hours' | 'minutes' | 'seconds'>
    ): Temporal.Duration;
    inTimeZone(tzLike?: Temporal.TimeZone | string): Temporal.DateTime;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(tzLike?: Temporal.TimeZone | string): string;
  }

  export type DateLike = {
    year?: number;
    month?: number;
    day?: number;
  };

  export type DateISOCalendarFields = {
    year: number;
    month: number;
    day: number;
  };

  /**
   * A `Temporal.Date` represents a calendar date. "Calendar date" refers to the
   * concept of a date as expressed in everyday usage, independent of any time
   * zone. For example, it could be used to represent an event on a calendar
   * which happens during the whole day no matter which time zone it's happening
   * in.
   *
   * See https://tc39.es/proposal-temporal/docs/date.html for more details.
   */
  export class Date implements Required<DateLike> {
    static from(item: Temporal.Date | DateLike | string, options?: AssignmentOptions): Temporal.Date;
    static compare(one: Temporal.Date, two: Temporal.Date): ComparisonResult;
    constructor(isoYear: number, isoMonth: number, isoDay: number);
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly dayOfWeek: number;
    readonly dayOfYear: number;
    readonly weekOfYear: number;
    readonly daysInYear: number;
    readonly daysInMonth: number;
    readonly isLeapYear: boolean;
    equals(other: Temporal.Date): boolean;
    with(dateLike: DateLike, options?: AssignmentOptions): Temporal.Date;
    plus(durationLike: Temporal.Duration | DurationLike, options?: ArithmeticOptions): Temporal.Date;
    minus(durationLike: Temporal.Duration | DurationLike, options?: ArithmeticOptions): Temporal.Date;
    difference(
      other: Temporal.Date,
      options?: DifferenceOptions<'years' | 'months' | 'weeks' | 'days'>
    ): Temporal.Duration;
    withTime(temporalTime: Temporal.Time): Temporal.DateTime;
    getYearMonth(): Temporal.YearMonth;
    getMonthDay(): Temporal.MonthDay;
    getFields(): Required<DateLike>;
    getISOCalendarFields(): DateISOCalendarFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(): string;
  }

  export type DateTimeLike = {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
  };

  export type DateTimeISOCalendarFields = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    microsecond: number;
    nanosecond: number;
  };

  /**
   * A `Temporal.DateTime` represents a calendar date and wall-clock time, with
   * a precision in nanoseconds, and without any time zone. Of the Temporal
   * classes carrying human-readable time information, it is the most general
   * and complete one. `Temporal.Date`, `Temporal.Time`, `Temporal.YearMonth`,
   * and `Temporal.MonthDay` all carry less information and should be used when
   * complete information is not required.
   *
   * See https://tc39.es/proposal-temporal/docs/datetime.html for more details.
   */
  export class DateTime implements Required<DateTimeLike> {
    static from(item: Temporal.DateTime | DateTimeLike | string, options?: AssignmentOptions): Temporal.DateTime;
    static compare(one: Temporal.DateTime, two: Temporal.DateTime): ComparisonResult;
    constructor(
      isoYear: number,
      isoMonth: number,
      isoDay: number,
      hour?: number,
      minute?: number,
      second?: number,
      millisecond?: number,
      microsecond?: number,
      nanosecond?: number
    );
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;
    readonly dayOfWeek: number;
    readonly dayOfYear: number;
    readonly weekOfYear: number;
    readonly daysInYear: number;
    readonly daysInMonth: number;
    readonly isLeapYear: boolean;
    equals(other: Temporal.DateTime): boolean;
    with(dateTimeLike: DateTimeLike, options?: AssignmentOptions): Temporal.DateTime;
    plus(durationLike: Temporal.Duration | DurationLike, options?: ArithmeticOptions): Temporal.DateTime;
    minus(durationLike: Temporal.Duration | DurationLike, options?: ArithmeticOptions): Temporal.DateTime;
    difference(
      other: Temporal.DateTime,
      options?: DifferenceOptions<'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'>
    ): Temporal.Duration;
    inTimeZone(tzLike: Temporal.TimeZone | string, options?: ToAbsoluteOptions): Temporal.Absolute;
    getDate(): Temporal.Date;
    getYearMonth(): Temporal.YearMonth;
    getMonthDay(): Temporal.MonthDay;
    getTime(): Temporal.Time;
    getFields(): Required<DateTimeLike>;
    getISOCalendarFields(): DateTimeISOCalendarFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(): string;
  }

  export type MonthDayLike = {
    month?: number;
    day?: number;
  };

  export type MonthDayISOCalendarFields = {
    month: number;
    day: number;
    refISOYear: number;
  };

  /**
   * A `Temporal.MonthDay` represents a particular day on the calendar, but
   * without a year. For example, it could be used to represent a yearly
   * recurring event, like "Bastille Day is on the 14th of July."
   *
   * See https://tc39.es/proposal-temporal/docs/monthday.html for more details.
   */
  export class MonthDay implements Required<MonthDayLike> {
    static from(item: Temporal.MonthDay | MonthDayLike | string, options?: AssignmentOptions): Temporal.MonthDay;
    constructor(isoMonth: number, isoDay: number);
    readonly month: number;
    readonly day: number;
    equals(other: Temporal.MonthDay): boolean;
    with(monthDayLike: MonthDayLike, options?: AssignmentOptions): Temporal.MonthDay;
    withYear(year: number | { year: number }): Temporal.Date;
    getFields(): Required<MonthDayLike>;
    getISOCalendarFields(): MonthDayISOCalendarFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(): string;
  }

  export type TimeLike = {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
  };

  /**
   * A `Temporal.Time` represents a wall-clock time, with a precision in
   * nanoseconds, and without any time zone. "Wall-clock time" refers to the
   * concept of a time as expressed in everyday usage — the time that you read
   * off the clock on the wall. For example, it could be used to represent an
   * event that happens daily at a certain time, no matter what time zone.
   *
   * `Temporal.Time` refers to a time with no associated calendar date; if you
   * need to refer to a specific time on a specific day, use
   * `Temporal.DateTime`. A `Temporal.Time` can be converted into a
   * `Temporal.DateTime` by combining it with a `Temporal.Date` using the
   * `withDate()` method.
   *
   * See https://tc39.es/proposal-temporal/docs/time.html for more details.
   */
  export class Time implements Required<TimeLike> {
    static from(item: Temporal.Time | TimeLike | string, options?: AssignmentOptions): Temporal.Time;
    static compare(one: Temporal.Time, two: Temporal.Time): ComparisonResult;
    constructor(
      hour?: number,
      minute?: number,
      second?: number,
      millisecond?: number,
      microsecond?: number,
      nanosecond?: number
    );
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;
    equals(other: Temporal.Time): boolean;
    with(timeLike: Temporal.Time | TimeLike, options?: AssignmentOptions): Temporal.Time;
    plus(durationLike: Temporal.Duration | DurationLike, options?: ArithmeticOptions): Temporal.Time;
    minus(durationLike: Temporal.Duration | DurationLike, options?: ArithmeticOptions): Temporal.Time;
    difference(other: Temporal.Time, options?: DifferenceOptions<'hours' | 'minutes' | 'seconds'>): Temporal.Duration;
    withDate(temporalDate: Temporal.Date): Temporal.DateTime;
    getFields(): Required<TimeLike>;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(): string;
  }

  /**
   * A `Temporal.TimeZone` is a representation of a time zone: either an
   * {@link https://www.iana.org/time-zones|IANA time zone}, including
   * information about the time zone such as the offset between the local time
   * and UTC at a particular time, and daylight saving time (DST) changes; or
   * simply a particular UTC offset with no DST.
   *
   * Since `Temporal.Absolute` and `Temporal.DateTime` do not contain any time
   * zone information, a `Temporal.TimeZone` object is required to convert
   * between the two.
   *
   * See https://tc39.es/proposal-temporal/docs/timezone.html for more details.
   */
  export class TimeZone {
    static from(timeZone: Temporal.TimeZone | string): Temporal.TimeZone;
    constructor(timeZoneIdentifier: string);
    readonly name: string;
    getOffsetNanosecondsFor(absolute: Temporal.Absolute): number;
    getOffsetStringFor(absolute: Temporal.Absolute): string;
    getDateTimeFor(absolute: Temporal.Absolute): Temporal.DateTime;
    getAbsoluteFor(dateTime: Temporal.DateTime, options?: ToAbsoluteOptions): Temporal.Absolute;
    getTransitions(startingPoint: Temporal.Absolute): IteratorResult<Temporal.Absolute>;
    getPossibleAbsolutesFor(dateTime: Temporal.DateTime): Temporal.Absolute[];
    toString(): string;
    toJSON(): string;
  }

  export type YearMonthLike = {
    year?: number;
    month?: number;
  };

  export type YearMonthISOCalendarFields = {
    year: number;
    month: number;
    refISODay: number;
  };

  /**
   * A `Temporal.YearMonth` represents a particular month on the calendar. For
   * example, it could be used to represent a particular instance of a monthly
   * recurring event, like "the June 2019 meeting".
   *
   * See https://tc39.es/proposal-temporal/docs/yearmonth.html for more details.
   */
  export class YearMonth implements Required<YearMonthLike> {
    static from(item: Temporal.YearMonth | YearMonthLike | string, options?: AssignmentOptions): Temporal.YearMonth;
    static compare(one: Temporal.YearMonth, two: Temporal.YearMonth): ComparisonResult;
    constructor(isoYear: number, isoMonth: number);
    readonly year: number;
    readonly month: number;
    readonly daysInMonth: number;
    readonly daysInYear: number;
    readonly isLeapYear: boolean;
    equals(other: Temporal.YearMonth): boolean;
    with(yearMonthLike: YearMonthLike, options: AssignmentOptions): Temporal.YearMonth;
    plus(durationLike: Temporal.Duration | DurationLike, options: ArithmeticOptions): Temporal.YearMonth;
    minus(durationLike: Temporal.Duration | DurationLike, options: ArithmeticOptions): Temporal.YearMonth;
    difference(other: Temporal.YearMonth, options: DifferenceOptions<'years' | 'months'>): Temporal.Duration;
    withDay(day: number): Temporal.Date;
    getFields(): Required<YearMonthLike>;
    getISOCalendarFields(): YearMonthISOCalendarFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(): string;
  }

  /**
   * The `Temporal.now` object has several methods which give information about
   * the current date, time, and time zone.
   *
   * See https://tc39.es/proposal-temporal/docs/now.html for more details.
   */
  export namespace now {
    /**
     * Get the system date and time as a `Temporal.Absolute`.
     *
     * This method gets the current absolute system time, without regard to
     * calendar or time zone. This is a good way to get a timestamp for an
     * event, for example. It works like the old-style JavaScript `Date.now()`,
     * but with nanosecond precision instead of milliseconds.
     * */
    export function absolute(): Temporal.Absolute;

    /**
     * Get the current calendar date and clock time in a specific time zone.
     *
     * @param {Temporal.TimeZone | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`) or a `Temporal.TimeZone` instance. If omitted,
     * the environment's current time zone will be used.
     */
    export function dateTime(tzLike?: Temporal.TimeZone | string): Temporal.DateTime;

    /**
     * Get the current calendar date in a specific time zone.
     *
     * @param {Temporal.TimeZone | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`) or a `Temporal.TimeZone` instance. If omitted,
     * the environment's current time zone will be used.
     */
    export function date(tzLike?: Temporal.TimeZone | string): Temporal.Date;

    /**
     * Get the current clock time in a specific time zone.
     *
     * @param {Temporal.TimeZone | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`) or a `Temporal.TimeZone` instance. If omitted,
     * the environment's current time zone will be used.
     */
    export function time(tzLike?: Temporal.TimeZone | string): Temporal.Time;

    /**
     * Get the environment's current time zone.
     *
     * This method gets the current system time zone. This will usually be a
     * named
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone}.
     */
    export function timeZone(): Temporal.TimeZone;
  }
}
