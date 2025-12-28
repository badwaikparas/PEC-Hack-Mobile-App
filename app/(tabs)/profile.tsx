import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0';
import * as Animatable from 'react-native-animatable';

interface SleepSession {
  _id: string;
  endTime: string;
  id: string;
  startTime: string;
  totalSleepMinutes: number;
  type: string;
  userId: string;
}

interface FoodDay {
  date: string;
  totalCalories: number;
  mealCount: number;
  userId: string;
}

export default function ProfileScreen() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'sleep' | 'food'>('sleep');
  const [sleepData, setSleepData] = useState<SleepSession[]>([]);
  const [foodData, setFoodData] = useState<FoodDay[]>([]);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    // Simulate fetching sleep data
    setLoading(true);
    setTimeout(() => {
      const mockSleepData: SleepSession[] = [
        {
          "_id": "695053260e422ef656234ac2",
          "endTime": "2025-12-23T06:31:00+05:30",
          "id": "sleep_c43d7fe2-92c4-418a-b533-32c238eac348",
          "startTime": "2025-12-23T00:41:00+05:30",
          "totalSleepMinutes": 350,
          "type": "night",
          "userId": "user_001"
        },
        {
          "_id": "695053260e422ef656234ac3",
          "endTime": "2025-12-22T07:15:00+05:30",
          "id": "sleep_d43d7fe2-92c4-418a-b533-32c238eac349",
          "startTime": "2025-12-22T23:30:00+05:30",
          "totalSleepMinutes": 405,
          "type": "night",
          "userId": "user_001"
        },
        {
          "_id": "695053260e422ef656234ac4",
          "endTime": "2025-12-21T06:45:00+05:30",
          "id": "sleep_e43d7fe2-92c4-418a-b533-32c238eac350",
          "startTime": "2025-12-21T00:00:00+05:30",
          "totalSleepMinutes": 405,
          "type": "night",
          "userId": "user_001"
        },
        {
          "_id": "695053260e422ef656234ac5",
          "endTime": "2025-12-20T07:00:00+05:30",
          "id": "sleep_f43d7fe2-92c4-418a-b533-32c238eac351",
          "startTime": "2025-12-20T23:15:00+05:30",
          "totalSleepMinutes": 465,
          "type": "night",
          "userId": "user_001"
        },
        {
          "_id": "695053260e422ef656234ac6",
          "endTime": "2025-12-19T06:30:00+05:30",
          "id": "sleep_g43d7fe2-92c4-418a-b533-32c238eac352",
          "startTime": "2025-12-19T00:20:00+05:30",
          "totalSleepMinutes": 370,
          "type": "night",
          "userId": "user_001"
        },
      ];
      
      const mockFoodData: FoodDay[] = [
        {
          date: "2025-12-23",
          totalCalories: 2150,
          mealCount: 4,
          userId: "user_001"
        },
        {
          date: "2025-12-22",
          totalCalories: 1890,
          mealCount: 3,
          userId: "user_001"
        },
        {
          date: "2025-12-21",
          totalCalories: 2340,
          mealCount: 5,
          userId: "user_001"
        },
        {
          date: "2025-12-20",
          totalCalories: 1980,
          mealCount: 3,
          userId: "user_001"
        },
        {
          date: "2025-12-19",
          totalCalories: 2210,
          mealCount: 4,
          userId: "user_001"
        },
        {
          date: "2025-12-18",
          totalCalories: 1760,
          mealCount: 3,
          userId: "user_001"
        },
      ];
      
      setSleepData(mockSleepData);
      setFoodData(mockFoodData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getSleepQuality = (minutes: number) => {
    if (minutes >= 420) { // 7+ hours
      return { label: 'Excellent', color: '#4CAF50', bg: '#E8F5E9', icon: 'checkmark-circle' };
    } else if (minutes >= 360) { // 6+ hours
      return { label: 'Good', color: '#2196F3', bg: '#E3F2FD', icon: 'thumbs-up' };
    } else if (minutes >= 300) { // 5+ hours
      return { label: 'Fair', color: '#FF9800', bg: '#FFF3E0', icon: 'warning' };
    } else {
      return { label: 'Poor', color: '#F44336', bg: '#FFEBEE', icon: 'alert-circle' };
    }
  };

  const formatSleepDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  const calculateAverageSleep = () => {
    if (sleepData.length === 0) return 0;
    const total = sleepData.reduce((sum, session) => sum + session.totalSleepMinutes, 0);
    return Math.round(total / sleepData.length);
  };

  const calculateAverageCalories = () => {
    if (foodData.length === 0) return 0;
    const total = foodData.reduce((sum, day) => sum + day.totalCalories, 0);
    return Math.round(total / foodData.length);
  };

  const getCalorieStatus = (calories: number) => {
    // Assuming 2000-2500 is healthy range
    if (calories >= 2000 && calories <= 2500) {
      return { label: 'Optimal', color: '#4CAF50', bg: '#E8F5E9', icon: 'checkmark-circle' };
    } else if (calories < 2000) {
      return { label: 'Low', color: '#2196F3', bg: '#E3F2FD', icon: 'arrow-down-circle' };
    } else if (calories <= 3000) {
      return { label: 'High', color: '#FF9800', bg: '#FFF3E0', icon: 'arrow-up-circle' };
    } else {
      return { label: 'Very High', color: '#F44336', bg: '#FFEBEE', icon: 'warning' };
    }
  };

  const averageSleep = calculateAverageSleep();
  const averageCalories = calculateAverageCalories();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-circle" size={32} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Profile</Text>
              <Text style={styles.headerSubtitle}>History & Insights</Text>
            </View>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sleep' && styles.tabActive]}
            onPress={() => setActiveTab('sleep')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={activeTab === 'sleep' ? "moon" : "moon-outline"} 
              size={20} 
              color={activeTab === 'sleep' ? '#FFFFFF' : '#E8F4F8'} 
            />
            <Text style={[styles.tabText, activeTab === 'sleep' && styles.tabTextActive]}>
              Sleep
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'food' && styles.tabActive]}
            onPress={() => setActiveTab('food')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={activeTab === 'food' ? "restaurant" : "restaurant-outline"} 
              size={20} 
              color={activeTab === 'food' ? '#FFFFFF' : '#E8F4F8'} 
            />
            <Text style={[styles.tabText, activeTab === 'food' && styles.tabTextActive]}>
              Food
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Card */}
          {activeTab === 'sleep' && sleepData.length > 0 && (
            <Animatable.View 
              animation="fadeInDown" 
              delay={200}
              style={styles.statsCard}
            >
              <Text style={styles.statsTitle}>Sleep Statistics</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#E8F4F8' }]}>
                    <Ionicons name="moon" size={24} color="#2E7D8F" />
                  </View>
                  <Text style={styles.statValue}>{sleepData.length}</Text>
                  <Text style={styles.statLabel}>Total Sessions</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="time" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.statValue}>{formatSleepDuration(averageSleep)}</Text>
                  <Text style={styles.statLabel}>Avg. Sleep</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="trending-up" size={24} color="#FF9800" />
                  </View>
                  <Text style={styles.statValue}>
                    {sleepData.filter(s => s.totalSleepMinutes >= 420).length}
                  </Text>
                  <Text style={styles.statLabel}>Good Nights</Text>
                </View>
              </View>
            </Animatable.View>
          )}

          {activeTab === 'food' && foodData.length > 0 && (
            <Animatable.View 
              animation="fadeInDown" 
              delay={200}
              style={styles.statsCard}
            >
              <Text style={styles.statsTitle}>Food Statistics</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="calendar" size={24} color="#FF6B35" />
                  </View>
                  <Text style={styles.statValue}>{foodData.length}</Text>
                  <Text style={styles.statLabel}>Days Tracked</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#FFE8E8' }]}>
                    <Ionicons name="flame" size={24} color="#E63946" />
                  </View>
                  <Text style={styles.statValue}>{averageCalories}</Text>
                  <Text style={styles.statLabel}>Avg. Calories</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="restaurant" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.statValue}>
                    {Math.round(foodData.reduce((sum, day) => sum + day.mealCount, 0) / foodData.length)}
                  </Text>
                  <Text style={styles.statLabel}>Avg. Meals</Text>
                </View>
              </View>
            </Animatable.View>
          )}

          {/* Sleep History */}
          {activeTab === 'sleep' && (
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Loading sleep history...</Text>
              </View>
            ) : sleepData.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="moon-outline" size={64} color="#E8F4F8" />
                <Text style={styles.emptyText}>No sleep data available</Text>
                <Text style={styles.emptySubtext}>Start tracking your sleep to see history</Text>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Sleep History</Text>
                {sleepData.map((session, index) => {
                  const quality = getSleepQuality(session.totalSleepMinutes);
                  return (
                    <Animatable.View
                      key={session.id}
                      animation="fadeInUp"
                      delay={index * 100}
                      style={styles.sleepCard}
                    >
                      <View style={styles.sleepCardHeader}>
                        <View style={styles.sleepCardHeaderLeft}>
                          <View style={[styles.dateIconContainer, { backgroundColor: '#E8F4F8' }]}>
                            <Ionicons name="calendar" size={20} color="#2E7D8F" />
                          </View>
                          <View>
                            <Text style={styles.sleepDate}>{formatDate(session.startTime)}</Text>
                            <Text style={styles.sleepType}>{session.type.charAt(0).toUpperCase() + session.type.slice(1)} Sleep</Text>
                          </View>
                        </View>
                        <View style={[styles.qualityBadge, { backgroundColor: quality.bg }]}>
                          <Ionicons name={quality.icon as any} size={16} color={quality.color} />
                          <Text style={[styles.qualityText, { color: quality.color }]}>
                            {quality.label}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.sleepDetails}>
                        <View style={styles.sleepTimeRow}>
                          <View style={styles.timeItem}>
                            <View style={styles.timeIconContainer}>
                              <Ionicons name="moon-outline" size={18} color="#2E7D8F" />
                            </View>
                            <View>
                              <Text style={styles.timeLabel}>Sleep Time</Text>
                              <Text style={styles.timeValue}>{formatTime(session.startTime)}</Text>
                            </View>
                          </View>
                          <View style={styles.timeDivider} />
                          <View style={styles.timeItem}>
                            <View style={styles.timeIconContainer}>
                              <Ionicons name="sunny-outline" size={18} color="#FFB84D" />
                            </View>
                            <View>
                              <Text style={styles.timeLabel}>Wake Time</Text>
                              <Text style={styles.timeValue}>{formatTime(session.endTime)}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.durationContainer}>
                          <View style={styles.durationIconContainer}>
                            <Ionicons name="time" size={24} color="#2E7D8F" />
                          </View>
                          <View style={styles.durationTextContainer}>
                            <Text style={styles.durationValue}>
                              {formatSleepDuration(session.totalSleepMinutes)}
                            </Text>
                            <Text style={styles.durationLabel}>Total Sleep Duration</Text>
                          </View>
                        </View>
                      </View>
                    </Animatable.View>
                  );
                })}
              </>
            )
          )}

          {/* Food History */}
          {activeTab === 'food' && (
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Loading food history...</Text>
              </View>
            ) : foodData.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="restaurant-outline" size={64} color="#E8F4F8" />
                <Text style={styles.emptyText}>No food data available</Text>
                <Text style={styles.emptySubtext}>Start tracking your meals to see history</Text>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Daily Calorie History</Text>
                {foodData.map((day, index) => {
                  const status = getCalorieStatus(day.totalCalories);
                  return (
                    <Animatable.View
                      key={day.date}
                      animation="fadeInUp"
                      delay={index * 100}
                      style={styles.foodCard}
                    >
                      <View style={styles.foodCardHeader}>
                        <View style={styles.foodCardHeaderLeft}>
                          <View style={[styles.dateIconContainer, { backgroundColor: '#FFF3E0' }]}>
                            <Ionicons name="calendar" size={20} color="#FF6B35" />
                          </View>
                          <View>
                            <Text style={styles.foodDate}>{formatDate(day.date)}</Text>
                            <Text style={styles.mealCount}>{day.mealCount} {day.mealCount === 1 ? 'meal' : 'meals'}</Text>
                          </View>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                          <Ionicons name={status.icon as any} size={16} color={status.color} />
                          <Text style={[styles.statusText, { color: status.color }]}>
                            {status.label}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.calorieContainer}>
                        <View style={styles.calorieIconContainer}>
                          <Ionicons name="flame" size={32} color="#FF6B35" />
                        </View>
                        <View style={styles.calorieContent}>
                          <Text style={styles.calorieValue}>{day.totalCalories.toLocaleString()}</Text>
                          <Text style={styles.calorieLabel}>Total Calories</Text>
                        </View>
                        <View style={styles.calorieProgress}>
                          <View style={styles.progressBarContainer}>
                            <View 
                              style={[
                                styles.progressBar, 
                                { 
                                  width: `${Math.min((day.totalCalories / 2500) * 100, 100)}%`,
                                  backgroundColor: status.color
                                }
                              ]} 
                            />
                          </View>
                          <Text style={styles.progressText}>
                            {Math.round((day.totalCalories / 2500) * 100)}% of daily goal
                          </Text>
                        </View>
                      </View>
                    </Animatable.View>
                  );
                })}
              </>
            )
          )}
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
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E8F4F8',
    fontWeight: '400',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  tabActive: {
    backgroundColor: '#FFEB3B',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E8F4F8',
  },
  tabTextActive: {
    color: '#1A3A4A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3A4A',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A3A4A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  sleepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sleepCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sleepCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  sleepType: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  qualityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    gap: 6,
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sleepDetails: {
    gap: 15,
  },
  sleepTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'center',
  },
  timeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  timeLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    paddingHorizontal: 15,
    gap: 12,
  },
  durationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationTextContainer: {
    flex: 1,
  },
  durationValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E7D8F',
    marginBottom: 4,
  },
  durationLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 15,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    marginHorizontal: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubtext: {
    color: '#E8F4F8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  foodCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  foodCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  foodDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  mealCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  calorieContainer: {
    gap: 15,
  },
  calorieIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  calorieContent: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FF6B35',
    marginBottom: 4,
  },
  calorieLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  calorieProgress: {
    marginTop: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});

