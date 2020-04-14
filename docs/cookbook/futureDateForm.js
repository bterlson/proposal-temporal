// Form parameters
const params = new URL(document.location).searchParams;
const futuredateParam = params.get('futuredate');

// If you have Intl.DurationFormat, then you can do this with
// until.toLocaleString() and untilMonths.toLocaleString(). This
// example will be updated when that becomes possible. For now, we can
// generate the string only in English.
function englishPlural(n, singular, plural) {
  return `${n} ${n === 1 ? singular : plural}`;
}

// When form data posted:
if (futuredateParam !== null) {
  const futureDate = Temporal.Date.from(futuredateParam);
  const today = Temporal.now.date();
  const until = today.difference(futureDate, { largestUnit: 'days' });
  const untilMonths = today.difference(futureDate, { largestUnit: 'months' });

  const dayString = englishPlural(until.days, 'day', 'days');
  const monthString =
    `${englishPlural(untilMonths.months, 'month', 'months')}` +
    (untilMonths.days !== 0 ? `, ${englishPlural(untilMonths.days, 'day', 'days')}` : '');

  const results = document.getElementById('futuredate-results');
  results.innerHTML = `
    <p>From and including: <strong>${today.toLocaleString()}</strong></p>
    <p>To but not including: <strong>${futureDate.toLocaleString()}</strong></p>
    <h4>Result: ${dayString}</h4>
    <p>It is ${dayString} from the start date to the end date, but not
    including the end date.</p>
    <p>Or ${monthString} excluding the end date.</p>
  `;
}
