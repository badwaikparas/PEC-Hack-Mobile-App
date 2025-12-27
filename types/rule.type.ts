import { SleepSession } from "./sleepSession.type";
import { Symptom } from "./symptom.type";

export type Rule = {
  id: string;
  description: string;
  condition: (data: SleepSession) => boolean;
  outcome: Symptom;
};
