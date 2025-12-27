import { useAuth0 } from 'react-native-auth0';
import { Button, Text, View } from 'react-native';

export default function LoginScreen() {
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
    <View>
      {user ? (
        <>
          <Text>Welcome {user.name}!</Text>
          <Button title="Log out" onPress={onLogout} />
        </>
      ) : (
        <Button title="Log in" onPress={onLogin} />
      )}
    </View>
  );
}