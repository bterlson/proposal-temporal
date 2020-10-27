# Temporal.Calendar

<details>
  <summary><strong>Table of Contents</strong></summary>
<!-- toc -->
</details>

A `Temporal.Calendar` is a representation of a calendar system.
It includes information about how many days are in each year, how many months are in each year, how many days are in each month, and how to do arithmetic in that calendar system.

Much of the world uses the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), which was invented in 1582 C.E.
On the modern Internet, the most often used calendar system is the calendar standardized by ISO 8601, which is the same as the Gregorian calendar with the addition of week-numbering rules.
In general it is extended backwards ("proleptically") to cover the period of history before its invention, which is an optional modification allowed by the ISO 8601 standard.

However, the ISO 8601 calendar is not the only calendar in common use in the world.
Some places use another calendar system as the main calendar, or have a separate calendar system as a commonly-used civil or religious calendar.

> **NOTE:** The Temporal polyfill currently only includes the ISO 8601 calendar, but the Temporal proposal will eventually provide all the calendars supported by Intl.
> See [issue #541](https://github.com/tc39/proposal-temporal/issues/541).

### When to use the `Temporal.Calendar`

It is best practice to specify a calendar system when performing calendar-sensitive operations, which are those involving arithmetic or other calculation in months or years.

For example, to add a month to a date in the Hebrew calendar:
```javascript
date.withCalendar('hebrew').add({ months: 1 })
```

Temporal types' `toLocaleString()` methods use the user's preferred calendar, without needing to call `withCalendar()`.
To perform arithmetic consistently with the `toLocaleString()` calendar system:

```javascript
const calendar = new Intl.DateTimeFormat().resolvedOptions().calendar;
date.withCalendar(calendar).add({ months: 1 })
```

### Custom calendars

For specialized applications where you need to do calculations in a calendar system that is not supported by Intl, you can implement a custom calendar.
There are two ways to do this.

The recommended way is to create a class inheriting from `Temporal.Calendar`, call `super()` in the constructor with a calendar identifier string, and implement all the members except `id`, `toString()`, and `fields()`, which are optional.
If you don't implement the optional members, then the base class's default implementations will be used.

The other, more difficult, way to create a custom calendar is to create a plain object implementing the `Temporal.Calendar` protocol, without subclassing.
The object must implement all of the `Temporal.Calendar` methods except for `fields()`.
Any object with the required methods will return the correct output from any Temporal property or method.
However, most other code will assume that custom calendars act like built-in `Temporal.Calendar` objects.
To interoperate with libraries or other code that you didn't write, then you should implement the `id` property and the `fields()` method as well.
Your object must not have a `calendar` property, so that it can be distinguished in `Temporal.Calendar.from()` from other Temporal objects that have a calendar.

The identifier of a custom calendar must consist of one or more components of between 3 and 8 ASCII alphanumeric characters each, separated by dashes, as described in [Unicode Technical Standard 35](https://unicode.org/reports/tr35/tr35.html#Unicode_locale_identifier).

## Constructor

### **new Temporal.Calendar**(_calendarIdentifier_: string) : Temporal.Calendar

**Parameters:**
- `calendarIdentifier` (string): An identifier for the calendar.

**Returns:** a new `Temporal.Calendar` object.

For a list of calendar identifiers, see the documentation for [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#Parameters).
If `calendarIdentifier` is not a built-in calendar, then a `RangeError` is thrown.

Use this constructor directly if you have a string that is known to be a correct built-in calendar identifier.
If you have an ISO 8601 date-time string with a `[c=identifier]` annotation, then `Temporal.Calendar.from()` is more convenient than parsing the identifier out of the string, and also the only way to parse strings annotated with a non-built-in calendar.

Example usage:
```javascript
cal = new Temporal.Calendar('iso8601');
cal = new Temporal.Calendar('gregory');
/*⚠️*/ cal = new Temporal.Calendar('discordian');  // not a built-in calendar, throws
```

## Static methods

### Temporal.Calendar.**from**(_thing_: any) : Temporal.Calendar

**Parameters:**
- `thing`: A calendar object, a Temporal object that carries a calendar, or a value from which to create a `Temporal.Calendar`.

**Returns:** a calendar object.

This static method creates a new calendar from another value.
If the value is another `Temporal.Calendar` object, or object implementing the calendar protocol, the same object is returned.
If the value is another Temporal object that carries a calendar or an object with a `calendar` property, such as a `Temporal.ZonedDateTime`, the object's calendar is returned.

Any other value is converted to a string, which is expected to be either:
- a string that is accepted by `new Temporal.Calendar()`; or
- a string in the ISO 8601 format.

Note that the ISO 8601 string can be extended with a `[c=identifier]` annotation in square brackets appended to it.
Without such an annotation, the calendar is taken to be `iso8601`.

This function is often more convenient to use than `new Temporal.Calendar()` because it handles a wider range of input.

Usage examples:
```javascript
// Calendar names
cal = Temporal.Calendar.from('iso8601');
cal = Temporal.Calendar.from('gregory');

// ISO 8601 string with or without calendar annotation
cal = Temporal.Calendar.from('2020-01-13T16:31:00.065858086');
cal = Temporal.Calendar.from('2020-01-13T16:31:00.065858086-08:00[America/Vancouver][c=iso8601]');

// Existing calendar object
cal2 = Temporal.Calendar.from(cal);

// Custom calendar that is a plain object (this calendar does not do much)
cal = Temporal.Calendar.from({id: 'mycalendar'});

/*⚠️*/ cal = Temporal.Calendar.from('discordian');  // not a built-in calendar, throws
/*⚠️*/ cal = Temporal.Calendar.from('[c=iso8601]');  // lone annotation not a valid ISO 8601 string
```

## Properties

### calendar.**id** : string

The `id` property gives an unambiguous identifier for the calendar.
Effectively, this is whatever `calendarIdentifier` was passed as a parameter to the constructor.

When subclassing `Temporal.Calendar`, this property doesn't need to be overridden because the default implementation gives the result of calling `toString()`.

## Methods

### calendar.**year**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | object | string) : number

### calendar.**month**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | Temporal.MonthDay | object | string) : number

### calendar.**day**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.MonthDay | object | string) : number

### calendar.**era**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | object | string) : string | undefined

### calendar.**dayOfWeek**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | object | string): number

### calendar.**dayOfYear**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | object | string): number

### calendar.**weekOfYear**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | object | string): number

### calendar.**daysInWeek**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | object | string): number

### calendar.**daysInMonth**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | object | string): number

### calendar.**daysInYear**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | object | string): number

### calendar.**monthsInYear**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | object | string): number

### calendar.**inLeapYear**(_date_: Temporal.Date | Temporal.DateTime | Temporal.ZonedDateTime | Temporal.YearMonth | object | string): boolean

The above methods are all similar.
They provide a way to query properties of a particular date in the calendar's date reckoning.

**Parameters:**
- `date` (`Temporal.Date`, or value convertible to one): A date.

**Returns:** some piece of data (year, month, day, etc., depending on the method) associated with `date`, in `calendar`'s calendar system.

If `date` is not one of the appropriate Temporal objects, then it will be converted to a `Temporal.Date` as if it were passed to `Temporal.Date.from()`.

None of the above methods need to be called directly except in specialized code.
They are called indirectly when reading the various properties of `Temporal.ZonedDateTime`, `Temporal.DateTime`, `Temporal.Date`, `Temporal.MonthDay`, or `Temporal.YearMonth`.

For example:
```javascript
const date = Temporal.Date.from('2020-05-29').withCalendar('hebrew');
date.year  // => 5780
date.calendar.year(date)  // same result, but calling the method directly
date.daysInYear  // => 355
date.calendar.daysInYear(date)  // same result, but calling the method directly
```

### calendar.**dateFromFields**(_fields_: object, _options_: object, _constructor_: function) : Temporal.Date

### calendar.**yearMonthFromFields**(_fields_: object, _options_: object, _constructor_: function) : Temporal.YearMonth

### calendar.**monthDayFromFields**(_fields_: object, _options_: object, _constructor_: function) : Temporal.MonthDay

The above three methods are similar.
They provide a way to construct other Temporal objects from values in the calendar's date reckoning.

**Parameters:**
- `fields` (object): An object with properties similar to what is passed to `Temporal.Date.from()`, `Temporal.YearMonth.from()`, or `Temporal.MonthDay.from()`, respectively.
- `options`: (object): An object with properties representing options for constructing the Temporal object.
  The following options are recognized:
  - `overflow` (string): How to deal with out-of-range values in `fields`.
    Allowed values are `constrain`, `balance`, and `reject`.
    The default is `constrain`.
- `constructor` (function): The constructor function of the Temporal type to construct.
  This is used when subclassing Temporal objects.

**Returns:** a new object of the type of `constructor`.

None of the above methods need to be called directly except in specialized code.
They are called indirectly when using `Temporal.Date.from()`, `Temporal.DateTime.from()`, `Temporal.YearMonth.from()`, and `Temporal.MonthDay.from()`.

For example:
```javascript
date = Temporal.Date.from(
    { year: 5780, month: 9, day: 6, calendar: 'hebrew' },
    { overflow: 'reject' }
);
date.year        // => 5780
date.month       // => 9
date.day         // => 6
date.toString()  // => 2020-05-29[c=hebrew]

// same result, but calling the method directly:
date = Temporal.Calendar.from('hebrew').dateFromFields(
    { year: 5780, month: 9, day: 6 },
    { overflow: 'reject' },
    Temporal.Date
);
date.year        // => 5780
date.month       // => 9
date.day         // => 6
date.toString()  // => 2020-05-29[c=hebrew]
```

### calendar.**dateAdd**(_date_: Temporal.Date | object | string, _duration_: Temporal.Duration | object | string, _options_: object, _constructor_: function) : Temporal.Date

### calendar.**dateSubtract**(_date_: Temporal.Date | object | string, _duration_: Temporal.Duration | object | string, _options_: object, _constructor_: function) : Temporal.Date

The above two methods are similar.
They provide a way to do date arithmetic in the calendar's date reckoning.

**Parameters:**
- `date` (`Temporal.Date`, or value convertible to one): A date.
- `duration` (`Temporal.Duration`, or value convertible to one): A duration to add or subtract from `date`.
- `options` (object): An object with properties representing options for performing the addition or subtraction.
  The following options are recognized:
  - `overflow` (string): How to deal with out-of-range values in the result of the addition or subtraction.
    Allowed values are `constrain` and `reject`.
    The default is `constrain`.
- `constructor` (function): The constructor function of the Temporal type to construct.
  This is used when subclassing Temporal objects.

**Returns:** a new object of the type of `constructor`.

If `date` is not a `Temporal.Date` object, or `duration` not a `Temporal.Duration` object, then they will be converted to one as if they were passed to `Temporal.Date.from()` or `Temporal.Duration.from()`, respectively.

Neither of the above methods need to be called directly except in specialized code.
They are called indirectly when using the `add()` and `subtract()` methods, respectively, of `Temporal.DateTime`, `Temporal.Date`, and `Temporal.YearMonth`.

For example:
```javascript
date = Temporal.Date.from('2020-05-29').withCalendar('islamic').add(
    Temporal.Duration.from({ months: 1 }),
    { overflow: 'reject' }
);
date.year        // => 1441
date.month       // => 11
date.day         // => 7
date.toString()  // => 2020-06-28[c=islamic]

// same result, but calling the method directly:
date = Temporal.Calendar.from('islamic').dateAdd(
    Temporal.Date.from('2020-05-29'),
    Temporal.Duration.from({ months: 1 }),
    { overflow: 'reject' },
    Temporal.Date
);
date.year        // => 1441
date.month       // => 11
date.day         // => 7
date.toString()  // => 2020-06-28[c=islamic]
```

### calendar.**dateUntil**(_one_: Temporal.Date | object | string, _two_: Temporal.Date | object | string, _options_: object) : Temporal.Duration

**Parameters:**
- `one` (`Temporal.Date`, or value convertible to one): A date.
- `two` (`Temporal.Date`, or value convertible to one): Another date.
- `options` (object): An object with properties representing options for the operation.
  The following options are recognized:
  - `largestUnit` (optional string): The largest unit of time to allow in the resulting `Temporal.Duration` object.
    Valid values are `'auto'`, `'years'`, `'months'`, and `'days'`.
    The default is `'auto'`.

**Returns:** a `Temporal.Duration` representing the time elapsed after `one` and until `two`.

If either of `smaller` or `larger` are not `Temporal.Date` objects, then they will be converted to one as if they were passed to `Temporal.Date.from()`.

This method does not need to be called directly except in specialized code.
It is called indirectly when using the `until()` and `since()` methods of `Temporal.DateTime`, `Temporal.Date`, and `Temporal.YearMonth`.

If `one` is later than `two`, then the resulting duration should be negative.

The default `largestUnit` value of `'auto'` is the same as `'days'`.

For example:
```javascript
d1 = Temporal.Date.from('2020-07-29').withCalendar('chinese');
d2 = Temporal.Date.from('2020-08-29').withCalendar('chinese');
d1.until(d2, { largestUnit: 'months' })  // => P1M2D

// same result, but calling the method directly:
Temporal.Calendar.from('chinese').dateUntil(
    Temporal.Date.from('2020-07-29'),
    Temporal.Date.from('2020-08-29'),
    { largestUnit: 'months' }
)  // => P1M2D
```

### calendar.**fields**(fields: array<string>) : array<string>

**Parameters:**

- `fields` (array of strings): A list of field names.

**Returns:** a new list of field names.

This method does not need to be called directly except in specialized code.
It is called indirectly when using the `from()` static methods and `with()` methods of `Temporal.DateTime`, `Temporal.Date`, and `Temporal.YearMonth`.

Custom calendars should override this method if they require more fields with which to denote the date than the standard `year`, `month`, and `day` (for example, `era`).
The input array contains the field names that are necessary for a particular operation (for example, `'month'` and `'day'` for `Temporal.MonthDay.prototype.with()`), and the method should make a copy of the array and add whichever extra fields are necessary.

When subclassing `Temporal.Calendar`, this method doesn't need to be overridden, unless your calendar requires extra fields, because the default implementation returns a copy of `fields`.

Usage example:

```js
// In built-in calendars, this method just makes a copy of the input array
Temporal.Calendar.from('iso8601').fields(['month', 'day']);
  // => ['month', 'day']
```

### calendar.**toString**() : string

**Returns:** The string given by `calendar.id`.

This method overrides `Object.prototype.toString()` and provides the calendar's `id` property as a human-readable description.

Example usage:
```javascript
Temporal.Date.from('2020-05-29[c=gregory]').calendar.toString()  // => gregory
```
