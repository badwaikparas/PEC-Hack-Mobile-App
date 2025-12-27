import { SleepSession } from "@/types/sleepSession.type";
import { evaluateSleepRules } from "../rules";

export function analyzeSleep(sleepData: SleepSession) {
  return evaluateSleepRules(sleepData);
}
