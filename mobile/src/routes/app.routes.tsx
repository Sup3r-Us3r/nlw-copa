import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Details } from '../screens/Details';
import { Find } from '../screens/Find';
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = () => {
  const { colors, sizes } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800]
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0
        }
      }}
    >
      <Screen
        name="New"
        component={New}
        options={{
          tabBarLabel: 'Novo bolão',
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={sizes[6]} />
          )
        }}
      />

      <Screen
        name="Pools"
        component={Pools}
        options={{
          tabBarLabel: 'Meus bolões',
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={sizes[6]} />
          )
        }}
      />

      <Screen
        name="Find"
        component={Find}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  );
};

export { AppRoutes };
