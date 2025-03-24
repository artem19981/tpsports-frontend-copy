import { toFixed } from 'shared/lib/to-fixed';

export function calculateSleepDuration(sleepTime: string, wakeTime: string) {
  const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
  const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);

  const sleepDate = new Date();
  sleepDate.setHours(sleepHours, sleepMinutes, 0, 0);

  const wakeDate = new Date();
  wakeDate.setHours(wakeHours, wakeMinutes, 0, 0);

  if (wakeDate < sleepDate) {
    wakeDate.setDate(wakeDate.getDate() + 1);
  }

  const durationInMillis = wakeDate.getTime() - sleepDate.getTime();
  const totalMinutes = Math.floor(durationInMillis / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
