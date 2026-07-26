import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '../store/auth.store';

// Screens Auth
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Screens App
import HomeScreen from '../screens/home/HomeScreen';
import ExploreStack from './ExploreStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Auth
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Tab Bar principale
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favoris') {
            iconName = focused ? 'star' : 'star-outline';
          } else {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#1a1a2e' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Explore" component={ExploreStack} options={{ title: 'Explorer', headerShown: false }} />
      <Tab.Screen name="Favoris" component={HomeScreen} options={{ title: 'Favoris' }} />
      <Tab.Screen name="Blog" component={HomeScreen} options={{ title: 'Blog' }} />
    </Tab.Navigator>
  );
}

// Navigation principale
export default function AppNavigation() {
  const { isAuthenticated, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}