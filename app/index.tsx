import { Text, View } from "react-native";
import { analyzeSleep } from "../services/sleepAnalyzer";

export default function Home() {
    const sleepData = {
        totalSleepMinutes: 320,
        remStart: "2025-01-10T21:30:00Z",
        remEnd: "2025-01-10T15:10:00Z",
        sleepStart: "2025-01-09T3:30:00Z",
        sleepEnd: "2025-01-10T05:50:00Z",
    };

    const symptoms = analyzeSleep(sleepData);

    return (
        <View style={{ padding: 20 }}>
            <Text>Detected Symptoms:</Text>
            {symptoms.map((s) => (
                <Text key={s.ruleId}>
                    {s.symptom.code} — {s.symptom.reason}
                </Text>
            ))}
        </View>
    );
}
