import {Layout} from '@/config/theme';
import {
  DASHBOARD,
  GAME,
  INPUTPLAYER,
  LEADERBOARD,
  SUCCESS,
} from '@/constants/routes';
import {
  DashboardScreen,
  GameScreen,
  InputPlayerScreen,
  LeaderboardScreen,
  SuccessScreen,
} from '@/containers';
import {navigationRef} from '@/utils';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <SafeAreaView style={[Layout().fill]}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
            gestureEnabled: false,
          })}>
          <Stack.Screen name={INPUTPLAYER} component={InputPlayerScreen} />
          <Stack.Screen
            name={DASHBOARD}
            component={DashboardScreen}
            options={{
              headerShown: true,
              gestureEnabled: true,
              title: ' ',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name={GAME}
            component={GameScreen}
            options={{
              headerShown: true,
              gestureEnabled: true,
              title: ' ',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen name={SUCCESS} component={SuccessScreen} />
          <Stack.Screen name={LEADERBOARD} component={LeaderboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
