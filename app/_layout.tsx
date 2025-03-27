import { Stack } from 'expo-router';
import '../global.css';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="main" />
    </Stack>
  );
};

export default RootLayout;
