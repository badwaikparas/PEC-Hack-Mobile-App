export function confidence(triggeredCount:number) {
  return Math.min(0.95, 0.4 + triggeredCount * 0.02);
}