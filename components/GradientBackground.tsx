// components/GradientBackground.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

export function GradientBackground({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6', '#ef4444']}
      style={StyleSheet.absoluteFill}
    >
      {children}
    </LinearGradient>
  );
}
