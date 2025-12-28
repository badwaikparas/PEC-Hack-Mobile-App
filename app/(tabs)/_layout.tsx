import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#E8E8E8',
        tabBarStyle: {
          backgroundColor: '#1A5A6B',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 + insets.bottom : 75 + insets.bottom,
          paddingBottom: Platform.OS === 'ios' ? 10 + insets.bottom : Math.max(insets.bottom, 10),
          paddingTop: 10,
          paddingHorizontal: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 4,
          marginBottom: 0,
        },
        tabBarShowLabel: true,
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarActiveTintColor: '#FFEB3B',
          tabBarInactiveTintColor: '#E8E8E8',
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? '#FFEB3B' : '#E8E8E8';
            return (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
                borderRadius: 12,
                padding: 6,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 40,
                minWidth: 40,
              }}>
                <Ionicons 
                  name={focused ? "home" : "home-outline"} 
                  size={focused ? 26 : 24} 
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: 'Food',
          tabBarActiveTintColor: '#FFEB3B',
          tabBarInactiveTintColor: '#E8E8E8',
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? '#FFEB3B' : '#E8E8E8';
            return (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
                borderRadius: 12,
                padding: 6,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80%',
                minWidth: 'auto',
              }}>
                <Ionicons 
                  name={focused ? "restaurant" : "restaurant-outline"} 
                  size={focused ? 26 : 24} 
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="sleep"
        options={{
          title: 'Sleep',
          tabBarActiveTintColor: '#FFEB3B',
          tabBarInactiveTintColor: '#E8E8E8',
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? '#FFEB3B' : '#E8E8E8';
            return (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
                borderRadius: 12,
                padding: 6,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 40,
                minWidth: 40,
              }}>
                <Ionicons 
                  name={focused ? "moon" : "moon-outline"} 
                  size={focused ? 26 : 24} 
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarActiveTintColor: '#FFEB3B',
          tabBarInactiveTintColor: '#E8E8E8',
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? '#FFEB3B' : '#E8E8E8';
            return (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
                borderRadius: 12,
                padding: 6,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 40,
                minWidth: 40,
              }}>
                <Ionicons 
                  name={focused ? "time" : "time-outline"} 
                  size={focused ? 26 : 24} 
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}

