import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function SleepAnalysisScreen() {
    const [loading, setLoading] = useState(false);
    const [sleepData, setSleepData] = useState(null);
    const [activeTab, setActiveTab] = useState('digestive');
    
    const tabs = [
        { key: 'digestive', title: 'Digestive', icon: 'nutrition' },
        { key: 'liver', title: 'Liver & Metabolism', icon: 'flame' },
        { key: 'circadian', title: 'Circadian Rhythm', icon: 'time' },
        { key: 'advice', title: 'Practical Advice', icon: 'bulb' },
        { key: 'health', title: 'Overall Health', icon: 'heart' },
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
            console.log("API Response Data:", JSON.stringify(data, null, 2));
            
            // Log specific fields to debug
            console.log("Digestive impact:", data.digestive_system_impact);
            console.log("Liver impact:", data.liver_and_metabolism_impact);
            console.log("Circadian:", data.circadian_rhythm_comment);
            console.log("Advice:", data.practical_advice);
            console.log("Health signal:", data.overall_health_signal);
            
            setSleepData(data);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const DigestiveRoute = () => (
        <View style={styles.scene}>
            <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="nutrition" size={28} color="#FF6B35" />
                </View>
                <Text style={styles.sectionTitle}>Digestive System Impact</Text>
            </View>
            <View style={styles.infoCard}>
                <Text style={styles.summary}>
                    {sleepData?.digestive_system_impact?.summary || 'No summary available. Sleep patterns can significantly affect digestive health, including metabolism and nutrient absorption.'}
                </Text>
            </View>
            <View style={styles.listCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="warning" size={20} color="#FF6B35" />
                    <Text style={styles.subTitle}>Possible Symptoms:</Text>
                </View>
                {sleepData?.digestive_system_impact?.possible_symptoms && sleepData.digestive_system_impact.possible_symptoms.length > 0 ? (
                    sleepData.digestive_system_impact.possible_symptoms.map((symptom, idx) => (
                        <View key={idx} style={styles.listItem}>
                            <Ionicons name="ellipse" size={8} color="#FF6B35" style={styles.bullet} />
                            <Text style={styles.item}>{symptom}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={[styles.item, { fontStyle: 'italic', color: '#999' }]}>
                        No specific symptoms identified. Poor sleep can lead to digestive issues like irregular bowel movements, decreased metabolism, and changes in appetite.
                    </Text>
                )}
            </View>
            <View style={styles.infoCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="information-circle" size={20} color="#2E7D8F" />
                    <Text style={styles.subTitle}>Why This Happens:</Text>
                </View>
                <Text style={styles.item}>
                    {sleepData?.digestive_system_impact?.why_this_happens || 'Sleep disruption affects the body\'s circadian rhythm, which regulates digestive processes. Inadequate sleep can slow metabolism, affect hormone production, and disrupt the gut-brain connection, leading to various digestive symptoms.'}
                </Text>
            </View>
        </View>
    );

    const LiverRoute = () => (
        <View style={styles.scene}>
            <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#FFE8E8' }]}>
                    <Ionicons name="flame" size={28} color="#E63946" />
                </View>
                <Text style={styles.sectionTitle}>Liver & Metabolism Impact</Text>
            </View>
            <View style={styles.infoCard}>
                <Text style={styles.summary}>
                    {sleepData?.liver_and_metabolism_impact?.summary || 'Sleep quality directly influences liver function and metabolic processes. Poor sleep can disrupt glucose metabolism, hormone regulation, and detoxification processes.'}
                </Text>
            </View>
            <View style={styles.listCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="flash" size={20} color="#E63946" />
                    <Text style={styles.subTitle}>Possible Effects:</Text>
                </View>
                {sleepData?.liver_and_metabolism_impact?.possible_effects && sleepData.liver_and_metabolism_impact.possible_effects.length > 0 ? (
                    sleepData.liver_and_metabolism_impact.possible_effects.map((effect, idx) => (
                        <View key={idx} style={styles.listItem}>
                            <Ionicons name="ellipse" size={8} color="#E63946" style={styles.bullet} />
                            <Text style={styles.item}>{effect}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={[styles.item, { fontStyle: 'italic', color: '#999' }]}>
                        No specific effects identified. Sleep deprivation can lead to insulin resistance, impaired glucose tolerance, reduced fat metabolism, and decreased liver function.
                    </Text>
                )}
            </View>
            <View style={styles.infoCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="information-circle" size={20} color="#2E7D8F" />
                    <Text style={styles.subTitle}>Why This Happens:</Text>
                </View>
                <Text style={styles.item}>
                    {sleepData?.liver_and_metabolism_impact?.why_this_happens || 'The liver follows a circadian rhythm for optimal function. Sleep disruption affects hormone production (insulin, cortisol, growth hormone), impairs glucose metabolism, and reduces the liver\'s ability to process toxins and regulate fat metabolism effectively.'}
                </Text>
            </View>
        </View>
    );

    const CircadianRoute = () => (
        <View style={styles.scene}>
            <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#E8F4F8' }]}>
                    <Ionicons name="time" size={28} color="#2E7D8F" />
                </View>
                <Text style={styles.sectionTitle}>Circadian Rhythm</Text>
            </View>
            <View style={styles.infoCard}>
                <Text style={styles.summary}>
                    {sleepData?.circadian_rhythm_comment?.summary || 'Your circadian rhythm regulates sleep-wake cycles and various biological processes. Irregular sleep patterns can disrupt this natural rhythm, affecting overall health and well-being.'}
                </Text>
            </View>
            <View style={styles.listCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="time-outline" size={20} color="#2E7D8F" />
                    <Text style={styles.subTitle}>Possible Implications:</Text>
                </View>
                {sleepData?.circadian_rhythm_comment?.possible_implications && sleepData.circadian_rhythm_comment.possible_implications.length > 0 ? (
                    sleepData.circadian_rhythm_comment.possible_implications.map((implication, idx) => (
                        <View key={idx} style={styles.listItem}>
                            <Ionicons name="ellipse" size={8} color="#2E7D8F" style={styles.bullet} />
                            <Text style={styles.item}>{implication}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={[styles.item, { fontStyle: 'italic', color: '#999' }]}>
                        No specific implications identified. Circadian disruption can lead to sleep disorders, mood changes, cognitive impairment, and increased risk of metabolic and cardiovascular issues.
                    </Text>
                )}
            </View>
            <View style={styles.infoCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="information-circle" size={20} color="#2E7D8F" />
                    <Text style={styles.subTitle}>Why This Happens:</Text>
                </View>
                <Text style={styles.item}>
                    {sleepData?.circadian_rhythm_comment?.why_this_happens || 'The circadian rhythm is controlled by the suprachiasmatic nucleus in the brain, which responds to light-dark cycles. Irregular sleep schedules, exposure to artificial light at night, and inconsistent sleep patterns can desynchronize this internal clock, leading to various health consequences.'}
                </Text>
            </View>
        </View>
    );

    const AdviceRoute = () => (
        <View style={styles.scene}>
            <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#FFF9C4' }]}>
                    <Ionicons name="bulb" size={28} color="#FFB84D" />
                </View>
                <Text style={styles.sectionTitle}>Practical Advice</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: '#FFF9C4' }]}>
                <View style={styles.listHeader}>
                    <Ionicons name="star" size={20} color="#FFB84D" />
                    <Text style={styles.subTitle}>Overall Tip:</Text>
                </View>
                <Text style={styles.summary}>
                    {sleepData?.practical_advice?.overall_tip || 'Maintain a consistent sleep schedule, aim for 7-9 hours of quality sleep per night, and create a relaxing bedtime routine to improve your sleep quality and overall health.'}
                </Text>
            </View>
            <View style={styles.listCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="checkmark-circle" size={20} color="#2E7D8F" />
                    <Text style={styles.subTitle}>Actionable Steps:</Text>
                </View>
                {sleepData?.practical_advice?.actionable_steps && sleepData.practical_advice.actionable_steps.length > 0 ? (
                    sleepData.practical_advice.actionable_steps.map((step, idx) => (
                        <View key={idx} style={styles.listItem}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>{idx + 1}</Text>
                            </View>
                            <Text style={styles.item}>{step}</Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.listItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <Text style={styles.item}>Go to bed and wake up at the same time every day, even on weekends</Text>
                    </View>
                )}
            </View>
            <View style={styles.tipCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="restaurant" size={20} color="#FF6B35" />
                    <Text style={styles.subTitle}>Food & Timing Tip:</Text>
                </View>
                <Text style={styles.item}>
                    {sleepData?.practical_advice?.food_and_timing_tip || 'Avoid large meals, caffeine, and alcohol 2-3 hours before bedtime. Consider light snacks if needed, and maintain regular meal times to support your circadian rhythm.'}
                </Text>
            </View>
            <View style={styles.tipCard}>
                <View style={styles.listHeader}>
                    <Ionicons name="moon" size={20} color="#2E7D8F" />
                    <Text style={styles.subTitle}>Sleep Improvement Tip:</Text>
                </View>
                <Text style={styles.item}>
                    {sleepData?.practical_advice?.sleep_improvement_tip || 'Create a dark, cool, and quiet sleep environment. Limit screen time before bed, practice relaxation techniques, and ensure your bedroom is dedicated to sleep and relaxation.'}
                </Text>
            </View>
        </View>
    );

    const HealthRoute = () => {
        const severity = sleepData?.overall_health_signal?.severity?.toLowerCase() || 'moderate';
        const severityColors = {
            low: { bg: '#E8F5E9', color: '#4CAF50', icon: 'checkmark-circle' },
            moderate: { bg: '#FFF3E0', color: '#FF9800', icon: 'warning' },
            high: { bg: '#FFEBEE', color: '#F44336', icon: 'alert-circle' }
        };
        const severityStyle = severityColors[severity] || severityColors.moderate;
        
        return (
            <View style={styles.scene}>
                <View style={styles.sectionHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: severityStyle.bg }]}>
                        <Ionicons name="heart" size={28} color={severityStyle.color} />
                    </View>
                    <Text style={styles.sectionTitle}>Overall Health Signal</Text>
                </View>
                <View style={[styles.severityCard, { backgroundColor: severityStyle.bg }]}>
                    <View style={styles.severityHeader}>
                        <Ionicons name={severityStyle.icon} size={24} color={severityStyle.color} />
                        <Text style={[styles.severityText, { color: severityStyle.color }]}>
                            Severity: {sleepData?.overall_health_signal?.severity || 'Moderate'}
                        </Text>
                    </View>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summary}>
                            {sleepData?.overall_health_signal?.one_line_summary || 'Your sleep patterns indicate some areas for improvement. Consider implementing better sleep hygiene practices to enhance your overall health and well-being.'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderContent = () => {
        if (!sleepData) {
            return (
                <View style={styles.scene}>
                    <Text style={styles.summary}>No sleep data available. Please analyze your sleep data first.</Text>
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
                <View style={styles.cardIconContainer}>
                    <Ionicons name="moon" size={48} color="#2E7D8F" />
                </View>
                <Text style={styles.cardTitle}>Sleep Analysis</Text>
                <Text style={styles.cardText}>
                    Analyze your sleep data to understand your rest patterns and improve your health.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchSleepAnalysis}
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    <Ionicons name="analytics" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>
                        {loading ? 'Analyzing...' : 'Analyze Sleep Data'}
                    </Text>
                </TouchableOpacity>

                {/* Loading Indicator */}
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color="#2E7D8F"
                        />
                        <Text style={styles.loadingText}>Processing your sleep data...</Text>
                    </View>
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
                                    activeOpacity={0.7}
                                >
                                    <Ionicons 
                                        name={tab.icon} 
                                        size={16} 
                                        color={activeTab === tab.key ? '#FFFFFF' : '#666'} 
                                        style={{ marginRight: 6 }}
                                    />
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
        borderRadius: 25,
        padding: 30,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    cardIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E8F4F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A3A4A',
        marginBottom: 10,
    },
    cardText: { 
        fontSize: 15, 
        color: '#666', 
        marginBottom: 25, 
        textAlign: 'center',
        lineHeight: 22,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
    button: {
        backgroundColor: '#2E7D8F',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2E7D8F',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
        minWidth: 200,
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 17, 
        fontWeight: '700',
    },
    scene: { padding: 20, backgroundColor: 'white', minHeight: 300 },
    sceneScroll: { flex: 1 },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#2E7D8F',
    },
    listCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    tipCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 10,
    },
    bullet: {
        marginTop: 6,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#2E7D8F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    stepNumberText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    severityCard: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
    },
    severityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    severityText: {
        fontSize: 18,
        fontWeight: '700',
    },
    summaryCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        padding: 15,
    },
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
        flexDirection: 'row',
        alignItems: 'center',
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
    sectionTitle: { 
        fontSize: 22, 
        fontWeight: '700', 
        color: '#1A3A4A',
        flex: 1,
    },
    subTitle: { 
        fontSize: 17, 
        fontWeight: '600',
        color: '#1A3A4A',
    },
    summary: { 
        fontSize: 16, 
        lineHeight: 24,
        color: '#333',
    },
    item: { 
        fontSize: 15, 
        lineHeight: 22,
        color: '#555',
        flex: 1,
    },
});