# Temporal

Provides standard objects and functions for working with dates and times.

## Status

This proposal is currently [Stage 3](https://github.com/tc39/proposals#stage-3) and was reviewed for Stage 3 by Richard Gibson, Bradley Farias, and Daniel Ehrenberg.

**NOTE: Although this proposal's API is not expected to change, implementers of this proposal MUST NOT ship unflagged Temporal implementations until IETF standardizes timezone/calendar string serialization formats. See [#1450](https://github.com/tc39/proposal-temporal/issues/1450) for updates.**

This proposal is now in the hands of ECMAScript engine implementers, so the bar for making API changes is extremely high.
Nonetheless, changes may occur as the result of feedback from implementation in JS engines.
Editorial changes to the spec and bug fixes to the spec, polyfill, tests, and docs are also ongoing, as is customary for Stage 3 proposals.
Additional tests and documentation content are also being added during Stage 3.

## Champions

- Philipp Dunkel ([@pipobscure](https://github.com/pipobscure))
- Maggie Johnson-Pint ([@maggiepint](https://github.com/maggiepint))
- Matt Johnson-Pint ([@mattjohnsonpint](https://github.com/mattjohnsonpint))
- Brian Terlson ([@bterlson](https://github.com/bterlson))
- Shane Carr ([@sffc](https://github.com/sffc))
- Ujjwal Sharma ([@ryzokuken](https://github.com/ryzokuken))
- Philip Chimento ([@ptomato](https://github.com/ptomato))
- Jason Williams ([@jasonwilliams](https://github.com/jasonwilliams))
- Justin Grant ([@justingrant](https://github.com/justingrant))

## Overview / Motivation

`Date` has been a long-standing pain point in ECMAScript.
This proposes `Temporal`, a global `Object` that acts as a top-level namespace (like `Math`), that brings a modern date/time API to the ECMAScript language.
For a detailed breakdown of motivations, see:
[Fixing JavaScript Date](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/)

### Principles:

- All Temporal objects are immutable.
- Date values can be represented in local calendar systems, but they should be convertable to and from the [Proleptic Gregorian Calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar).
- All time-of-day values are based on a standard 24-hour clock.
- [Leap seconds](https://en.wikipedia.org/wiki/Leap_second) are not represented.

## Specification Text

The specification text can be found [here](https://tc39.es/proposal-temporal/).

## Polyfill

A [non-production polyfill](./polyfill) was built to validate this proposal.
The champions of this proposal will soon start work on a production-ready polyfill, and once it's started it will be linked here.
If you're working on a different production-quality polyfill, let us know and we can link it here too!

When viewing the [reference documentation](https://tc39.es/proposal-temporal/docs/index.html), the polyfill is automatically loaded in your browser, so you can try it out by opening your browser's developer tools console.

**NOTE: We encourage you to experiment with the polyfill, but don't use it in production!**
**The API may change based on feedback from implementers, and the current non-production polyfill is very slow for some operations.**

## Documentation

Reference documentation and examples can be found [here](https://tc39.es/proposal-temporal/docs/index.html).

A cookbook to help you get started and learn the ins and outs of Temporal is available [here](https://tc39.es/proposal-temporal/docs/cookbook.html)
