import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/YourScheduleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RankScreen from '../screens/RankScreen'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Schedule',
          headerStyle: {
            fontFamily: 'Octarine-Bold'
          },
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
        }}
      />
      <BottomTab.Screen
        name="YourSchedule"
        component={LinksScreen}
        options={{
          title: 'Your Schedule',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
      <BottomTab.Screen
        name="Ranking"
        component={RankScreen}
        options={{
          title: 'Rankings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-trophy" />,
        }}
      />
      <BottomTab.Screen
        name="Notes"
        component={SettingsScreen}
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-list-box" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configure',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
      
      
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Schedule';
    case 'YourSchedule':
      return 'Customized Team Schedule';
    case 'Settings':
      return 'Configure Concurrent';
    case 'Ranking':
      return 'Rankings';
    case 'Notes':
      return 'Notes';
  }
}
