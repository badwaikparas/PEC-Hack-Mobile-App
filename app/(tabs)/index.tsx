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
});

