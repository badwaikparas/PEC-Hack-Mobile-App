import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0';
import { useRouter, useSegments } from 'expo-router';

export default function LoginScreen() {
    const { authorize, user, error } = useAuth0();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (user && segments[0] !== '(tabs)') {
            router.replace('/(tabs)' as any);
        }
    }, [user, segments, router]);

    const onLogin = async () => {
        try {
          await authorize();
        } catch (e) {
          console.log(e);
        }
    };

    // If user is logged in, show nothing while redirecting
    if (user) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.gradient}>
                <View style={styles.loginContainer}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="leaf" size={80} color="#FFFFFF" />
                        <Text style={styles.appName}>biomimic</Text>
                        <Text style={styles.tagline}>Your Health, Your Way</Text>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
                        <Text style={styles.loginButtonText}>Get Started</Text>
                        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
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
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
    marginTop: 40,
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#E8F4F8',
    marginTop: 10,
    fontWeight: '300',
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D8F',
  },
  errorText: {
    color: '#FFE8E8',
    marginTop: 20,
    fontSize: 14,
  },
});
