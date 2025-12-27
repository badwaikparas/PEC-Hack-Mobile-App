import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Auth0Provider } from 'react-native-auth0';

export default function RootLayout() {

    return (
        <Auth0Provider 
              domain="dev-t4cynlfydmh4fois.us.auth0.com" 
              clientId="Wx9Np9Hjiu6AJUKdm9Y5sCmu4wEQw2Wg"
            >
              {/* Your app content/Stack */}
            <Stack>
                {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
            </Stack>
            <StatusBar style="auto" />
        </Auth0Provider>
        
    );
}
