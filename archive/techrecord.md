# Technical Design Decision Record

As part of creating/improving the *temporal* proposal, a discussions took place involving [@maggiepint](https://twitter.com/maggiepint), [@RedSquirrelious](https://twitter.com/RedSquirrelious), [@bterlson](https://twitter.com/bterlson) and  [@pipobscure](https://twitter.com/pipobscure) as well as at times [@littledan](https://twitter.com/littledan) and others. These are the conclusions we arrived at. This is the summary of my recollections of the reasoning behind these decisions.

## Omit `toDate()` methods

We did not want to tie the *temporal* proposals to the existing `Date` built-in objects. The creating an explicit dependency makes future evolution of the standards harder.

For that reason we omitted the `toDate()` methods from the proposal. This is simply a shortcut for `new Date(instant.milliseconds)` to begin with, so there is very little benefit to that tie.

## Naming `fromEpochMilliseconds()` rather than `fromDate()` method

In the same vein as omitting `toDate()` we also decided to name the method to create an Instant from a `Date` as `fromEpochMilliseconds()` rather than `fromDate()`. For one thing, the name `fromEpochMilliseconds()` is actually more reflective of what the method is supposed to do as it is supposed to accept a numeric argument representing the *milliseconds since epoch* as well.

The semantics of the method will be:

1. _ms_ is the value of `ToNumber(argument)`
1. _ns_ is set to `0`
1. a new instant is created with the *value of* `(ms * 1e6) + ns`

In this logic, the first step would convert a `Date` object to its numeric value via `Date.prototype.valueOf()` which is the *milliseconds since epoch*. As such even though the methods was renamed it can still function as `fromDate()` without making an explicit tie to the build-in `Date` object.

## Naming method `fromString()` rather than `parse()`

There has been long lived discussions on the inconsistencies in the implementations of `Date.parse()`. The aim of naming `fromString()` as that rather than `parse()` was to avoid these. `fromString()` should mirror the behaviour of `toString()` rather than implementing an actual parse. The only functionality `fromString()` should support is parsing the *strings* produced by `toString()` and nothing more.

This is narrowed down to an exceedingly narrow set of formats by explicitly and tightly specifying the relevant `toString()` operations.

The purpose of `fromString()` and the reason we felt we still wanted it as part of the api is that we wanted to allow round-tripping like `Instant.fromString(instant.toString())` which allows for easier serialisation.

**Examples**

`Instant.prototype.toString()` always outputs **&lt;year>-&lt;month>-&lt;day>T&lt;hours>:&lt;minutes>:&lt;seconds>.&lt;nanoseconds>Z**

`ZonedDateTime.prototype.toString` always outputs **&lt;year>-&lt;month>-&lt;day>T&lt;hours>:&lt;minutes>:&lt;seconds>.&lt;nanoseconds>[Z|&lt;offset>]**

Other formats of parts will not be output, so the `fromString()` methods can be extremely restrictive.

### ZonedDateTime.prototype.timeZone will be the offset rather than the IANA name

The offset at a point in time is unique an clear. It can also be parsed back allowing for serialisation as described above.

In contrast the *IANA Zones* are unclear and are hard to parse back requiring a full timezone database. In order to keep the proposal interoperable with IoT and other low-spec scenarios, requiring full *IANA* support seemed contraindicated.

At the same time we felt it's critical to allow for fully supporting *IANA Zones* in the `ZonedDateTime` constructor as well as the `withZone()` methods.

---

### Timezones should be restricted to IANA-Names

[From #120](https://github.com/tc39/proposal-temporal/issues/120)

We should try to identify time zones exclusively by IANA name, rather than having magic "UTC" and "SYSTEM" strings (the former being "Etc/UTC", the latter ideally being accessed via another means such as a getSystemTimeZone function or systemTimeZone Symbol).
ZonedDateTime values must always have an IANA time zone. Values without a time zone but with a (fixed) nonzero UTC offset will be represented with OffsetDateTime.

### fromString rejects input with extraneous or discordant information

[From #120](https://github.com/tc39/proposal-temporal/issues/120)

OffsetDateTime.fromString rejects input with a bracketed time zone, since it only cares about offset and cannot necessarily verify consistency (e.g., because the implementation doesn't have time zone data). For example, OffsetDateTime.fromString("2019-04-02T22:58:36.123456789-04:00[America/New_York]") does not result in a successful parse.

ZonedDateTime.fromString requires a bracketed time zone and consistency between that value and the offset. For example, ZonedDateTime.fromString("2019-04-02T22:58:36.123456789-05:00[America/New_York]") does not result in a successful parse because the UTC offset and time zone are inconsistent at the given instant.

For eliminating the need to use Date, fromString functions accept reduced precision values, e.g. CivilTime.fromString("10:23") and OffsetDateTime.fromString("2019-04-03T02:30Z") and maybe CivilDate.fromString("2019-04").

### Other decisions / discussion from 2019-03

 * Time-Unit properties should be named as below (plural in Duration and singular in every other type)?
 * Temporal objects should not have an inheritance relationship
 * offsetSeconds as a measurement is a relic of `Date` and should be discontinued.

### Augmentation / Information lossiness

All temporal objects should be information stable. All methods that increase or keep stable the amount of data should have the `with` prefix. All methods that decrease the amount of data (lossy operations) should have the `get` prefix.

### Durations are absolute values with integer units

Negative durations make no sense. Therefore there is a need to have both a `plus` and a `minus` method for date/time arithmetics.
Only integer units are supported in durations and arithmetic. Expressing fractions requires the use of smaller units.

### The properties on Instant should be getXXX() methods

This comes out of [#139](https://github.com/tc39/proposal-temporal/issues/139). It's actually true that the epochNanoseconds and their ilk aren't really the value of the Instant and that the value of the Instant shouldn't be exposed. There is however a clear relation between an Instant and the epoch, so that `fromEpochNanoseconds()` and `getEpochNanoseconds()` should be the way forward.

### TimeZone objects should be a thing

There have been multiple requests that there is an interface to the time-zone data directly. For that reason we have introduced TimeZone objects. They stringify to the IANA-name of the timezone or the Offset-String in case of a pure offset.

### OffsetDateTime

Since `TimeZone` objects are now a thing and have all the information necessary to distinguish between pure offsets and actual IANA time-zones the distinction between `OffsetDateTime` and `ZonedDateTime` has become meaningless. Therefore we are dropping `OffsetDateTime`.

### Duration strings

`Duration` objects stringify to ISO8601 duration strings and can also be created from such strings. Which makes it easier to work with durations. Any place a duration can be passed into an API either an actual `Duration` object, or a POJO with the same fields, or an ISO8601 duration string can be passed.

### Add `Local` namespace object

Issue [#148](https://github.com/tc39/proposal-temporal/issues/148) gave some valuable feedback. A big part of that was that for most cases one would start off the current date and time.

At the same time, we acknowledge the need for security and the need to eliminate leaking methods such as getting the current date/time.

For that reason we have the `Local` namespace to encapsulate all of these.

```javascript
Local.instant = ()=>Instant.fromEpochNanoseconds(<lt;epoch nanos from system&gt;);
Local.timeZone = ()=>TimeZone.for(&lt;current-timezone&gt;);
Local.zoneDateTime = ()=>Local.Instant.withZone(Local.timeZone());
Local.dateTime = ()=>Local.zonedDateTime().getDateTime();
Local.date = ()=>Local.dateTime().getDate();
Local.time = ()=>Local.dateTime().getTime();
Local.yearMonth = ()=>Local.date().getYearMonth();
Local.monthDay = ()=>Local.date().getMonthDay();
```

Which means the only actually relevant exposing methods are `Local.instant()` and `Local.timeZone()`. Which are well defined places that can be replaced for secure environments.

What isn't exposed is any exfiltration of system data via constructors or via things on the individual Temporal classes. We believe this to be a sensible compromise between usability needs and security concerns.

### Object comparisons

We have added:

 * `Instant.compare(left, right)` - compares IntantLike objects (Instant & ZonedDateTime) by their Intant-Value
 * `DateTime.compare(left, right)` - compare DateTimeLike objects by year, month, day, hour, minute, second, ...
 * `Date.compare(left, right)` - compare DateLike objects by year, month, day
 * `Time.compare(left, right)` - compare TimeLike objects by hour, minute, second, ...

These functions are able to be plugged into `Array.prototype.sort()` permitting to sort lists.

For `ZonedDateTime` object both `Instant.compare(left, right)` & `DateTime.compare(left, right)` can be used, allowing for sorting either in terms of the absolute point in time or the date/time fields (ignoring the timezone).
