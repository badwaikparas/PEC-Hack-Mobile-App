import { SleepSession } from "@/types/sleepSession.type";
import { getHour } from "../utils/time";

export const tiredRule = {
  id: "RULE_TIRED_LOW_SLEEP_LATE_REM",
  description: "Sleep < 6h and REM starts late",
  condition: (sleep: SleepSession) => {
    const totalSleepHours = sleep.totalSleepMinutes / 60;
      const remStartHour = getHour(sleep.remStart);
      console.log("totalSleepHours : ", totalSleepHours)
      console.log("remStartHour : ", remStartHour)
 
    return totalSleepHours < 6 && remStartHour >= 4;
  },
  outcome: {
    code: "TIRED",
    severity: "HIGH",
    reason: "Less than 6 hours of sleep and delayed REM cycle",
  },
};
