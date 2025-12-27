export function userWeight(triggeredCount:number) {
  return Math.min(0.6, triggeredCount / 30);
}
