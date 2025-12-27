// src/models/sleep.ts

/**
 * Raw sleep session data
 * Source: wearable / HealthKit / Google Fit
 */
export interface SleepSession {
  /** ISO timestamp when sleep started */
  sleepStart: string;

  /** ISO timestamp when sleep ended */
  sleepEnd: string;

  /** Total sleep time (excluding awake time) */
  totalSleepMinutes: number;

  /** REM sleep start time */
  remStart?: string;

  /** REM sleep end time */
  remEnd?: string;

  /** Optional deep sleep duration */
  deepSleepMinutes?: number;

  /** Optional light sleep duration */
  lightSleepMinutes?: number;

  /** Data source for auditing */
  source: "APPLE_HEALTH" | "GOOGLE_FIT" | "FITBIT" | "MANUAL";
}
