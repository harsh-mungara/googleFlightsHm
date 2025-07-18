import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { FlightProvider } from './context/FlightContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { useAuth } from './hooks/useAuth';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FlightProvider>
          <AppContent />
        </FlightProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App; 