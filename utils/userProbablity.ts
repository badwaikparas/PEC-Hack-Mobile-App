export function userProbability(confirmed:number , triggered:number): number {
  return (confirmed + 1) / (triggered + 2);
}

export function finalProbability(popProb: number, userProb:number): number {
  return 0.6 * popProb + 0.4 * userProb;
}
