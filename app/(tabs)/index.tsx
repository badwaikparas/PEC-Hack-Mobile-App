import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserProfile from '@/services/components/UserProfile';
import { useAuth0 } from 'react-native-auth0';

export default function HomeScreen() {
    const { clearSession, user } = useAuth0();
    const [profileData, setProfileData] = useState({
        height: '',
        weight: '',
        age: '',
        gender: '',
    });

    const onLogout = async () => {
        try {
          await clearSession();
        } catch (e) {
          console.log(e);
        }
    };

    const handleProfileUpdate = (data: { height: string; weight: string; age: string; gender: string }) => {
        setProfileData(data);
    };

    // Calculate BMI from height and weight
    const calculateBMI = () => {
        if (!profileData.height || !profileData.weight) {
            return null;
        }

        // Extract numeric values (handle "175 cm" or just "175")
        const heightValue = parseFloat(profileData.height.replace(/[^0-9.]/g, ''));
        const weightValue = parseFloat(profileData.weight.replace(/[^0-9.]/g, ''));

        if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
            return null;
        }

        // Convert height from cm to meters (if height > 3, assume it's in cm)
        const heightInMeters = heightValue > 3 ? heightValue / 100 : heightValue;
        
        // Calculate BMI: weight (kg) / height (m)²
        const bmi = weightValue / (heightInMeters * heightInMeters);
        return parseFloat(bmi.toFixed(1));
    };

    // Get BMI category and styling
    const getBMICategory = (bmi: number | null) => {
        if (bmi === null) {
            return { category: 'N/A', color: '#999', bgColor: '#F5F5F5', icon: 'help-circle' };
        }
        
        if (bmi < 18.5) {
            return { category: 'Underweight', color: '#2196F3', bgColor: '#E3F2FD', icon: 'arrow-down-circle' };
        } else if (bmi < 25) {
            return { category: 'Normal', color: '#4CAF50', bgColor: '#E8F5E9', icon: 'checkmark-circle' };
        } else if (bmi < 30) {
            return { category: 'Overweight', color: '#FF9800', bgColor: '#FFF3E0', icon: 'warning' };
        } else {
            return { category: 'Obese', color: '#F44336', bgColor: '#FFEBEE', icon: 'alert-circle' };
        }
    };

    const bmi = calculateBMI();
    const bmiInfo = getBMICategory(bmi);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.gradient}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Ionicons name="leaf" size={32} color="#FFFFFF" />
                        <Text style={styles.headerTitle}>biomimic</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                        <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.welcomeCard}>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.userName}>{user?.name || user?.email || 'User'}</Text>
                    </View>

                    <UserProfile
                        height={profileData.height}
                        weight={profileData.weight}
                        age={profileData.age}
                        gender={profileData.gender}
                        onUpdate={handleProfileUpdate}
                    />

                    {/* BMI Calculator Section */}
                    <View style={styles.bmiCard}>
                        <View style={styles.bmiHeader}>
                            <View style={[styles.bmiIconContainer, { backgroundColor: bmiInfo.bgColor }]}>
                                <Ionicons name={bmiInfo.icon as any} size={32} color={bmiInfo.color} />
                            </View>
                            <View style={styles.bmiHeaderText}>
                                <Text style={styles.bmiTitle}>Body Mass Index (BMI)</Text>
                                <Text style={styles.bmiSubtitle}>Based on your height and weight</Text>
                            </View>
                        </View>

                        {bmi !== null ? (
                            <>
                                <View style={styles.bmiValueContainer}>
                                    <Text style={[styles.bmiValue, { color: bmiInfo.color }]}>
                                        {bmi}
                                    </Text>
                                    <Text style={styles.bmiUnit}>kg/m²</Text>
                                </View>
                                <View style={[styles.bmiCategoryBadge, { backgroundColor: bmiInfo.bgColor }]}>
                                    <Ionicons name={bmiInfo.icon as any} size={18} color={bmiInfo.color} />
                                    <Text style={[styles.bmiCategoryText, { color: bmiInfo.color }]}>
                                        {bmiInfo.category}
                                    </Text>
                                </View>
                                <View style={styles.bmiInfoRow}>
                                    <View style={styles.bmiInfoItem}>
                                        <Text style={styles.bmiInfoLabel}>Height</Text>
                                        <Text style={styles.bmiInfoValue}>{profileData.height || 'N/A'}</Text>
                                    </View>
                                    <View style={styles.bmiInfoDivider} />
                                    <View style={styles.bmiInfoItem}>
                                        <Text style={styles.bmiInfoLabel}>Weight</Text>
                                        <Text style={styles.bmiInfoValue}>{profileData.weight || 'N/A'}</Text>
                                    </View>
                                    <View style={styles.bmiInfoDivider} />
                                    <View style={styles.bmiInfoItem}>
                                        <Text style={styles.bmiInfoLabel}>Age</Text>
                                        <Text style={styles.bmiInfoValue}>{profileData.age || 'N/A'}</Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View style={styles.bmiEmptyState}>
                                <Ionicons name="calculator-outline" size={48} color="#CCC" />
                                <Text style={styles.bmiEmptyText}>
                                    Enter your height and weight{'\n'}to calculate your BMI
                                </Text>
                            </View>
                        )}

                        {/* BMI Scale Reference */}
                        <View style={styles.bmiScaleContainer}>
                            <Text style={styles.bmiScaleTitle}>BMI Scale:</Text>
                            <View style={styles.bmiScale}>
                                <View style={[styles.bmiScaleItem, { backgroundColor: '#E3F2FD' }]}>
                                    <Text style={styles.bmiScaleText}>Underweight</Text>
                                    <Text style={styles.bmiScaleRange}>&lt; 18.5</Text>
                                </View>
                                <View style={[styles.bmiScaleItem, { backgroundColor: '#E8F5E9' }]}>
                                    <Text style={styles.bmiScaleText}>Normal</Text>
                                    <Text style={styles.bmiScaleRange}>18.5 - 24.9</Text>
                                </View>
                                <View style={[styles.bmiScaleItem, { backgroundColor: '#FFF3E0' }]}>
                                    <Text style={styles.bmiScaleText}>Overweight</Text>
                                    <Text style={styles.bmiScaleRange}>25 - 29.9</Text>
                                </View>
                                <View style={[styles.bmiScaleItem, { backgroundColor: '#FFEBEE' }]}>
                                    <Text style={styles.bmiScaleText}>Obese</Text>
                                    <Text style={styles.bmiScaleRange}>≥ 30</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: '#2E7D8F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    minHeight: 70,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 18,
    gap: 4,
    marginLeft: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  welcomeText: {
    fontSize: 16,
    color: '#E8F4F8',
    fontWeight: '400',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 5,
  },
  bmiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bmiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bmiIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bmiHeaderText: {
    flex: 1,
  },
  bmiTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A3A4A',
    marginBottom: 4,
  },
  bmiSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
  bmiValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 15,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: '800',
    marginRight: 8,
  },
  bmiUnit: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  bmiCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    gap: 8,
  },
  bmiCategoryText: {
    fontSize: 16,
    fontWeight: '700',
  },
  bmiInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginBottom: 20,
  },
  bmiInfoItem: {
    alignItems: 'center',
    flex: 1,
  },
  bmiInfoDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  bmiInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  bmiInfoValue: {
    fontSize: 16,
    color: '#1A3A4A',
    fontWeight: '600',
  },
  bmiEmptyState: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  bmiEmptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  bmiScaleContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  bmiScaleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3A4A',
    marginBottom: 10,
  },
  bmiScale: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bmiScaleItem: {
    flex: 1,
    minWidth: '45%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bmiScaleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A3A4A',
    marginBottom: 4,
  },
  bmiScaleRange: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
});

