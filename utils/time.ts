export function getMinutesBetween(start: string, end: string): number {
  return (new Date(end).getTime() - new Date(start).getTime()) / 60000;
}

export function getHour(isoTime: string): number {
  return new Date(isoTime).getHours();
}
