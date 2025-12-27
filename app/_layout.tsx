import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Auth0Provider } from 'react-native-auth0';

export default function RootLayout() {
    return (
        <Auth0Provider 
            domain="dev-t4cynlfydmh4fois.us.auth0.com" 
            clientId="Wx9Np9Hjiu6AJUKdm9Y5sCmu4wEQw2Wg"
        >
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </Auth0Provider>
    );
}
