import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ComponentProps } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName: IoniconsName;
          if (route.name === 'customers')
            iconName = focused ? 'person' : 'person-outline';
          else iconName = focused ? 'home' : 'home-outline';
          return <TabBarIcon name={iconName} color={color} />;
        },
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: '#687076',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="customers" options={{ title: 'Customers' }} />
    </Tabs>
  );
}
