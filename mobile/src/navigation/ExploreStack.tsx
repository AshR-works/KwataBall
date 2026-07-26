// src/navigation/ExploreStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/explore/ExploreScreen';
import TeamDetailScreen from '../screens/explore/TeamDetailScreen';
import PlayerDetailScreen from '../screens/explore/PlayerDetailScreen';

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExploreHome" component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TeamDetail" component={TeamDetailScreen} options={{ title: '' }} />
      <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}