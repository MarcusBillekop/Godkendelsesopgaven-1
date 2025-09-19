// Hovedapp: Opsætter navigation med tre skærme (Søg, Resultater, Kort)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator håndterer skærm-skift og titler */}
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Find lokale' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Resultater' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Kort & rute' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
