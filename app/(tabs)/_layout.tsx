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
          height: Platform.OS === 'ios' ? 75 + insets.bottom : 60 + insets.bottom,
          paddingBottom: Platform.OS === 'ios' ? 15 + insets.bottom : Math.max(insets.bottom, 20),
          paddingTop: 5,
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
          marginTop: 0,
        },
        tabBarShowLabel: true,
        tabBarIconStyle: {
          marginTop: 0,
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
                padding: 4,
                paddingHorizontal: 10,
              }}>
                <Ionicons 
                  name={focused ? "home" : "home-outline"} 
                  size={focused ? 24 : 22} 
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
                padding: 4,
                paddingHorizontal: 10,
              }}>
                <Ionicons 
                  name={focused ? "restaurant" : "restaurant-outline"} 
                  size={focused ? 24 : 22} 
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
                padding: 4,
                paddingHorizontal: 10,
              }}>
                <Ionicons 
                  name={focused ? "moon" : "moon-outline"} 
                  size={focused ? 24 : 22} 
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

