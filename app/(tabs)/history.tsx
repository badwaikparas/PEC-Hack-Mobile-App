import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0';

// Mock data for demonstration
const mockFoodHistory = [
  {
    date: '2025-01-15',
    day: 'Today',
    meals: [
      { type: 'Breakfast', items: 'Oatmeal with fruits', calories: 320, time: '08:30' },
      { type: 'Lunch', items: 'Grilled chicken salad', calories: 450, time: '13:00' },
      { type: 'Dinner', items: 'Salmon with vegetables', calories: 520, time: '19:30' },
    ],
    totalCalories: 1290,
  },
  {
    date: '2025-01-14',
    day: 'Yesterday',
    meals: [
      { type: 'Breakfast', items: 'Scrambled eggs & toast', calories: 380, time: '09:00' },
      { type: 'Lunch', items: 'Pasta with tomato sauce', calories: 550, time: '13:30' },
      { type: 'Snack', items: 'Apple & almonds', calories: 180, time: '16:00' },
      { type: 'Dinner', items: 'Vegetable stir-fry', calories: 420, time: '20:00' },
    ],
    totalCalories: 1530,
  },
  {
    date: '2025-01-13',
    day: '2 days ago',
    meals: [
      { type: 'Breakfast', items: 'Greek yogurt & granola', calories: 350, time: '08:00' },
      { type: 'Lunch', items: 'Quinoa bowl with chickpeas', calories: 480, time: '12:30' },
      { type: 'Dinner', items: 'Beef steak with potatoes', calories: 680, time: '19:00' },
    ],
    totalCalories: 1510,
  },
  {
    date: '2025-01-12',
    day: '3 days ago',
    meals: [
      { type: 'Breakfast', items: 'Smoothie bowl', calories: 290, time: '08:45' },
      { type: 'Lunch', items: 'Caesar salad', calories: 420, time: '13:15' },
      { type: 'Dinner', items: 'Chicken curry with rice', calories: 590, time: '19:45' },
    ],
    totalCalories: 1300,
  },
];

const mockSleepHistory = [
  {
    date: '2025-01-15',
    day: 'Today',
    sleepTime: '23:00',
    wakeTime: '07:30',
    duration: '8h 30m',
    quality: 'Good',
    qualityColor: '#4CAF50',
    qualityBg: '#E8F5E9',
  },
  {
    date: '2025-01-14',
    day: 'Yesterday',
    sleepTime: '22:45',
    wakeTime: '06:45',
    duration: '8h 0m',
    quality: 'Excellent',
    qualityColor: '#2196F3',
    qualityBg: '#E3F2FD',
  },
  {
    date: '2025-01-13',
    day: '2 days ago',
    sleepTime: '00:15',
    wakeTime: '07:00',
    duration: '6h 45m',
    quality: 'Fair',
    qualityColor: '#FF9800',
    qualityBg: '#FFF3E0',
  },
  {
    date: '2025-01-12',
    day: '3 days ago',
    sleepTime: '23:30',
    wakeTime: '08:00',
    duration: '8h 30m',
    quality: 'Good',
    qualityColor: '#4CAF50',
    qualityBg: '#E8F5E9',
  },
];

export default function HistoryScreen() {
  const { user } = useAuth0();
  const [activeTab, setActiveTab] = useState<'food' | 'sleep'>('food');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="time" size={28} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.headerTitle}>History</Text>
              <Text style={styles.headerSubtitle}>Track your daily activities</Text>
            </View>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
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
              Food History
            </Text>
          </TouchableOpacity>
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
              Sleep History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'food' ? (
            <>
              {mockFoodHistory.map((day, index) => (
                <View key={index} style={styles.dayCard}>
                  <View style={styles.dayHeader}>
                    <View style={styles.dayHeaderLeft}>
                      <View style={[styles.dayIconContainer, { backgroundColor: '#FFF3E0' }]}>
                        <Ionicons name="calendar" size={20} color="#FF6B35" />
                      </View>
                      <View>
                        <Text style={styles.dayTitle}>{day.day}</Text>
                        <Text style={styles.dayDate}>{formatDate(day.date)}</Text>
                      </View>
                    </View>
                    <View style={styles.calorieBadge}>
                      <Ionicons name="flame" size={16} color="#FF6B35" />
                      <Text style={styles.calorieText}>{day.totalCalories} kcal</Text>
                    </View>
                  </View>

                  <View style={styles.mealsContainer}>
                    {day.meals.map((meal, mealIndex) => (
                      <View key={mealIndex} style={styles.mealItem}>
                        <View style={styles.mealHeader}>
                          <View style={styles.mealTypeContainer}>
                            <Ionicons 
                              name={meal.type === 'Breakfast' ? 'sunny' : meal.type === 'Lunch' ? 'partly-sunny' : meal.type === 'Dinner' ? 'moon' : 'cafe'} 
                              size={16} 
                              color="#2E7D8F" 
                            />
                            <Text style={styles.mealType}>{meal.type}</Text>
                          </View>
                          <Text style={styles.mealTime}>{meal.time}</Text>
                        </View>
                        <Text style={styles.mealItems}>{meal.items}</Text>
                        <View style={styles.mealCalories}>
                          <Ionicons name="flame-outline" size={14} color="#FF6B35" />
                          <Text style={styles.mealCalorieText}>{meal.calories} kcal</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              {mockSleepHistory.map((day, index) => (
                <View key={index} style={styles.dayCard}>
                  <View style={styles.dayHeader}>
                    <View style={styles.dayHeaderLeft}>
                      <View style={[styles.dayIconContainer, { backgroundColor: '#E8F4F8' }]}>
                        <Ionicons name="moon" size={20} color="#2E7D8F" />
                      </View>
                      <View>
                        <Text style={styles.dayTitle}>{day.day}</Text>
                        <Text style={styles.dayDate}>{formatDate(day.date)}</Text>
                      </View>
                    </View>
                    <View style={[styles.qualityBadge, { backgroundColor: day.qualityBg }]}>
                      <Text style={[styles.qualityText, { color: day.qualityColor }]}>
                        {day.quality}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.sleepDetails}>
                    <View style={styles.sleepDetailRow}>
                      <View style={styles.sleepDetailItem}>
                        <Ionicons name="moon-outline" size={20} color="#2E7D8F" />
                        <View style={styles.sleepDetailText}>
                          <Text style={styles.sleepDetailLabel}>Sleep Time</Text>
                          <Text style={styles.sleepDetailValue}>{day.sleepTime}</Text>
                        </View>
                      </View>
                      <View style={styles.sleepDivider} />
                      <View style={styles.sleepDetailItem}>
                        <Ionicons name="sunny-outline" size={20} color="#FFB84D" />
                        <View style={styles.sleepDetailText}>
                          <Text style={styles.sleepDetailLabel}>Wake Time</Text>
                          <Text style={styles.sleepDetailValue}>{day.wakeTime}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.durationContainer}>
                      <Ionicons name="time-outline" size={24} color="#2E7D8F" />
                      <Text style={styles.durationText}>{day.duration}</Text>
                      <Text style={styles.durationLabel}>Total Sleep</Text>
                    </View>
                  </View>
                </View>
              ))}
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
  dayCard: {
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
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dayHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  dayDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  calorieBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    gap: 6,
  },
  calorieText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
  qualityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  qualityText: {
    fontSize: 14,
    fontWeight: '700',
  },
  mealsContainer: {
    gap: 12,
  },
  mealItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#2E7D8F',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mealType: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D8F',
  },
  mealTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  mealItems: {
    fontSize: 15,
    color: '#1A3A4A',
    marginBottom: 8,
    lineHeight: 20,
  },
  mealCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mealCalorieText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  sleepDetails: {
    gap: 15,
  },
  sleepDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  sleepDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'center',
  },
  sleepDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  sleepDetailText: {
    alignItems: 'flex-start',
  },
  sleepDetailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  sleepDetailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
  },
  durationText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E7D8F',
    marginRight: 8,
  },
  durationLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

