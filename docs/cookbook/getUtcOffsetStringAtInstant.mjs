const instant = Temporal.Instant.from('2020-01-09T00:00Z');
const nyc = Temporal.TimeZone.from('America/New_York');
const zdt = instant.toZonedDateTime(nyc, 'iso8601');

zdt.offset; // => '-05:00'

assert.equal(zdt.offset, '-05:00');
