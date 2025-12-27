import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import FoodAnalyzer from '@/services/foodAnalyzer'
import LoginScreen from '@/services/pages/loginPage';
import { useAuth0 } from 'react-native-auth0';

export default function App() {
    const { authorize, clearSession, user, error } = useAuth0();

    const onLogin = async () => {
        try {
          await authorize();
        } catch (e) {
          console.log(e);
        }
      };
    
      const onLogout = async () => {
        try {
          await clearSession();
        } catch (e) {
          console.log(e);
        }
      };
  return (
    
    <View style={styles.container}>
        {user ? (
            <>
            <Button title="Log Out" onPress={onLogout} />
            <FoodAnalyzer />
            </>):(<Button title="Log in" onPress={onLogin} />)
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
