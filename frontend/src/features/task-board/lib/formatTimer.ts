export function formatTimer(timestamp: number) {
  const HOURS_PER_DAY = 24;
  const MINUTES_PER_HOUR = 60;
  const SECONDS_PER_MINUTE = 60;
  const MILLISECONDS_PER_SECOND = 1000;

  const hours = Math.floor(
    (timestamp /
      (MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)) %
      HOURS_PER_DAY,
  );
  const minutes = Math.floor(
    (timestamp / (SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)) %
      MINUTES_PER_HOUR,
  );
  const seconds = Math.floor(
    (timestamp / MILLISECONDS_PER_SECOND) % SECONDS_PER_MINUTE,
  );

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}
