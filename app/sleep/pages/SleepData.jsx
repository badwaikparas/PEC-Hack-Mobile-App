import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function SleepAnalysisScreen() {
    const [loading, setLoading] = useState(false);
    const [sleepData, setSleepData] = useState(null);
    const [activeTab, setActiveTab] = useState('digestive');
    
    const tabs = [
        { key: 'digestive', title: 'Digestive' },
        { key: 'liver', title: 'Liver & Metabolism' },
        { key: 'circadian', title: 'Circadian Rhythm' },
        { key: 'advice', title: 'Practical Advice' },
        { key: 'health', title: 'Overall Health' },
    ];

    const dummySleepData = {
        "id": "sleep_d3e20307-ccb7-47cd-a6ee-4ff6c49aab29",
        "userId": "user_001",
        "type": "night",
        "startTime": "2025-12-25T19:22:00.000Z",
        "endTime": "2025-12-25T23:37:00.000Z", 
        "totalSleepMinutes": 255,
        "stages": [
            {
                "type": "light",
                "start": "2025-12-25T19:22:00.000Z",
                "end": "2025-12-25T19:38:00.000Z"
            }, {
                "type": "deep",
                "start": "2025-12-25T19:38:00.000Z",
                "end": "2025-12-25T20:16:00.000Z"
            }, {
                "type": "light",
                "start": "2025-12-25T20:16:00.000Z",
                "end": "2025-12-25T20:33:00.000Z"
            }, {
                "type": "rem",
                "start": "2025-12-25T20:33:00.000Z",
                "end": "2025-12-25T20:39:00.000Z"
            }, {
                "type": "awake",
                "start": "2025-12-25T20:39:00.000Z",
                "end": "2025-12-25T20:44:00.000Z"
            }, {
                "type": "light",
                "start": "2025-12-25T20:44:00.000Z",
                "end": "2025-12-25T21:06:00.000Z"
            }, {
                "type": "deep",
                "start": "2025-12-25T21:06:00.000Z",
                "end": "2025-12-25T21:45:00.000Z"
            }, {
                "type": "light",
                "start": "2025-12-25T21:45:00.000Z",
                "end": "2025-12-25T22:03:00.000Z"
            }, {
                "type": "rem",
                "start": "2025-12-25T22:03:00.000Z",
                "end": "2025-12-25T22:11:00.000Z"
            }, {
                "type": "light",
                "start": "2025-12-25T22:11:00.000Z",
                "end": "2025-12-25T22:34:00.000Z"
            }, {
                "type": "deep",
                "start": "2025-12-25T22:34:00.000Z",
                "end": "2025-12-25T22:48:00.000Z"
            }, {
                "type": "light",
                "start": "2025-12-25T22:48:00.000Z",
                "end": "2025-12-25T22:59:00.000Z"
            }, {
                "type": "rem",
                "start": "2025-12-25T22:59:00.000Z",
                "end": "2025-12-25T23:28:00.000Z"
            }, {
                "type": "light",
                "start": "2025-12-25T23:28:00.000Z",
                "end": "2025-12-25T23:37:00.000Z"
            }
        ]
    }

    const fetchSleepAnalysis = async () => {
        setLoading(true);
        try {
            console.log("calling sleep analysis");
            
            const response = await fetch('https://pec-hacks-backend.onrender.com/sleepAnalysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dummySleepData),
            });
            console.log("response", response);
            

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            console.log("data", data);
            
            setSleepData(data);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const DigestiveRoute = () => (
        <View style={styles.scene}>
            <Text style={styles.sectionTitle}>Digestive System Impact</Text>
            <Text style={styles.summary}>{sleepData.digestive_system_impact?.summary}</Text>
            <Text style={styles.subTitle}>Possible Symptoms:</Text>
            {sleepData.digestive_system_impact?.possible_symptoms?.map((symptom, idx) => (
                <Text key={idx} style={styles.item}>• {symptom}</Text>
            ))}
            <Text style={styles.subTitle}>Why This Happens:</Text>
            <Text style={styles.item}>{sleepData?.digestive_system_impact?.why_this_happens}</Text>
        </View>
    );

    const LiverRoute = () => (
        <View style={styles.scene}>
            <Text style={styles.sectionTitle}>Liver & Metabolism Impact</Text>
            <Text style={styles.summary}>{sleepData.liver_and_metabolism_impact?.summary}</Text>
            <Text style={styles.subTitle}>Possible Effects:</Text>
            {sleepData?.liver_and_metabolism_impact?.possible_effects?.map((effect, idx) => (
                <Text key={idx} style={styles.item}>• {effect}</Text>
            ))}
            <Text style={styles.subTitle}>Why This Happens:</Text>
            <Text style={styles.item}>{sleepData?.liver_and_metabolism_impact?.why_this_happens}</Text>
        </View>
    );

    const CircadianRoute = () => (
        <View style={styles.scene}>
            <Text style={styles.sectionTitle}>Circadian Rhythm</Text>
            <Text style={styles.summary}>{sleepData?.circadian_rhythm_comment?.summary}</Text>
            <Text style={styles.subTitle}>Possible Implications:</Text>
            {sleepData?.circadian_rhythm_comment?.possible_implications?.map((implication, idx) => (
                <Text key={idx} style={styles.item}>• {implication}</Text>
            ))}
            <Text style={styles.subTitle}>Why This Happens:</Text>
            <Text style={styles.item}>{sleepData?.circadian_rhythm_comment?.why_this_happens}</Text>
        </View>
    );

    const AdviceRoute = () => (
        <View style={styles.scene}>
            <Text style={styles.sectionTitle}>Practical Advice</Text>
            <Text style={styles.summary}>{sleepData?.practical_advice?.overall_tip}</Text>
            <Text style={styles.subTitle}>Actionable Steps:</Text>
            {sleepData?.practical_advice?.actionable_steps?.map((step, idx) => (
                <Text key={idx} style={styles.item}>• {step}</Text>
            ))}
            <Text style={styles.subTitle}>Food & Timing Tip:</Text>
            <Text style={styles.item}>{sleepData?.practical_advice?.food_and_timing_tip}</Text>
            <Text style={styles.subTitle}>Sleep Improvement Tip:</Text>
            <Text style={styles.item}>{sleepData?.practical_advice?.sleep_improvement_tip}</Text>
        </View>
    );

    const HealthRoute = () => (
        <View style={styles.scene}>
            <Text style={styles.sectionTitle}>Overall Health Signal</Text>
            <Text style={styles.summary}>Severity: {sleepData?.overall_health_signal?.severity}</Text>
            <Text style={styles.item}>{sleepData?.overall_health_signal?.one_line_summary}</Text>
        </View>
    );

    const renderContent = () => {
        if (!sleepData) {
            return (
                <View style={styles.scene}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        switch (activeTab) {
            case 'digestive':
                return <DigestiveRoute />;
            case 'liver':
                return <LiverRoute />;
            case 'circadian':
                return <CircadianRoute />;
            case 'advice':
                return <AdviceRoute />;
            case 'health':
                return <HealthRoute />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Background animated waves */}
            <Animatable.View
                animation="fadeIn"
                iterationCount="infinite"
                direction="alternate"
                style={styles.backgroundWave}
            />

            {/* Animated Title */}
            <Animatable.Text
                animation="fadeInDown"
                duration={1500}
                style={styles.title}
            >
                Sleep Analysis
            </Animatable.Text>

            {/* Card with button */}
            <Animatable.View
                animation="fadeInUp"
                delay={500}
                style={styles.card}
            >
                <Text style={styles.cardText}>
                    Analyze your sleep data to understand your rest patterns.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchSleepAnalysis}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Analyze Sleep Data</Text>
                </TouchableOpacity>

                {/* Loading Indicator */}
                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#2E7D8F"
                        style={{ marginTop: 20 }}
                    />
                )}
            </Animatable.View>

            {/* Tab View */}
            {sleepData && (
                <Animatable.View 
                    animation="fadeInUp" 
                    delay={700} 
                    style={{ width: '100%', marginTop: 20 }}
                >
                    {/* Custom Tab Bar */}
                    <View style={styles.tabBarContainer}>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.tabBar}
                        >
                            {tabs.map((tab) => (
                                <TouchableOpacity
                                    key={tab.key}
                                    style={[
                                        styles.tabButton,
                                        activeTab === tab.key && styles.tabButtonActive
                                    ]}
                                    onPress={() => setActiveTab(tab.key)}
                                >
                                    <Text
                                        style={[
                                            styles.tabButtonText,
                                            activeTab === tab.key && styles.tabButtonTextActive
                                        ]}
                                    >
                                        {tab.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Tab Content */}
                    <View style={styles.tabContent}>
                        <ScrollView style={styles.sceneScroll}>
                            {renderContent()}
                        </ScrollView>
                    </View>
                </Animatable.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent' },
    backgroundWave: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 20 },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    cardText: { fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center' },
    button: {
        backgroundColor: '#2E7D8F',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    scene: { padding: 20, backgroundColor: 'white', minHeight: 300 },
    sceneScroll: { flex: 1 },
    tabBarContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    tabButtonActive: {
        backgroundColor: '#2E7D8F',
    },
    tabButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    tabButtonTextActive: {
        color: '#fff',
    },
    tabContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        minHeight: 400,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 15, marginBottom: 5 },
    subTitle: { fontSize: 16, fontWeight: '500', marginTop: 10 },
    summary: { fontSize: 16, marginVertical: 5 },
    item: { fontSize: 15, marginLeft: 10, marginVertical: 2 },
});