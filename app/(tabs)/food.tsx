import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FoodAnalyzer from '@/services/foodAnalyzer';
import { useAuth0 } from 'react-native-auth0';

export default function FoodScreen() {
    const { user } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.gradient}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Ionicons name="restaurant" size={32} color="#FFFFFF" />
                        <View>
                            <Text style={styles.headerTitle}>Food Analyzer</Text>
                            <Text style={styles.headerSubtitle}>Track your nutrition</Text>
                        </View>
                    </View>
                </View>
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <FoodAnalyzer />
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
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});

