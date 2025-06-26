import { useEffect } from 'react';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/firebase';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        router.replace('/(main)');
      } else {
        router.replace('/(auth)/sign-in');
      }

      await SplashScreen.hideAsync();
    });

    return unsubscribe;
  }, []);

  return null;
}
