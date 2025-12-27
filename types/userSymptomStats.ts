export type UserSymptomStats = {
  userId: string
  symptom: "tired" | "headache" | "indigestion"
  triggeredCount: number      // rule fired
  confirmedCount: number      // user said YES
}
