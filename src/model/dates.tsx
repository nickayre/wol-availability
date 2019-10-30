import { DateTime, Interval } from 'luxon';

const WEEK_START = {
  hour: 18,
  millisecond: 0,
  minute: 0,
  second: 0,
  weekday: 1,
};

/**
 * Gets the shift week interval which contains @a dt.
 */
export function getWeekInterval(dt: DateTime): Interval {
  const start = dt.set(WEEK_START);
  const end = start.plus({ weeks: 1 });
  return Interval.fromDateTimes(start, end);
}
