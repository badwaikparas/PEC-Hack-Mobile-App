import { SleepSession } from "@/types/sleepSession.type";
import { tiredRule } from "./tired.rule";

const RULES = [tiredRule];

export function evaluateSleepRules(sleepData: SleepSession) {
  const results = [];

  for (const rule of RULES) {
    if (rule.condition(sleepData)) {
      results.push({
        ruleId: rule.id,
        symptom: rule.outcome,
        triggeredAt: new Date().toISOString(),
      });
    }
  }

  return results;
}
