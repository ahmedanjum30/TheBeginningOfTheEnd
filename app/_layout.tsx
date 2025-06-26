import { Stack, useRouter, Href } from 'expo-router';
import '../global.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/firebase';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Keep native splash visible

export default function RootLayout() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        return;
      }

      setUser(currentUser);
      setReady(true);
      await SplashScreen.hideAsync();
    });
  }, []);

  useEffect(() => {
    if (ready) {
      router.replace((user ? '/(main)' : '/(auth)/sign-in') as Href);
    }
  }, [ready, user, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}
