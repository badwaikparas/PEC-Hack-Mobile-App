import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
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

export default function ProfileScreen() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [sleepData, setSleepData] = useState<SleepSession[]>([]);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    // Simulate fetching sleep data
    setLoading(true);
    setTimeout(() => {
      const mockData: SleepSession[] = [
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
      setSleepData(mockData);
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

  const averageSleep = calculateAverageSleep();

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
              <Text style={styles.headerSubtitle}>Sleep History & Insights</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Card */}
          {sleepData.length > 0 && (
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

          {/* Sleep History */}
          {loading ? (
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
});

