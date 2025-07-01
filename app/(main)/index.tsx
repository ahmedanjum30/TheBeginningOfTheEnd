import { View, Text, Button } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';

export default function Main() {
  const router = useRouter();
  return (
    <GradientBackground>
      <View className="flex-1 justify-center px-8">
        <Text className="text-3xl font-bold text-center mb-8">
          HI I AM MAIN SCREEN
        </Text>
        <Button
          title="Go to Customers"
          onPress={() => router.push('/customers' as Href)}
        />
      </View>
    </GradientBackground>
  );
}
