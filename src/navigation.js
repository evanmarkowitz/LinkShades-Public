import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import ControlPanelScreen from '../screens/ControlPanelScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import ChooseShadeScreen from '../screens/AddSchedule/ChooseShadeScreen'
import ChooseTimeScreen from '../screens/AddSchedule/ChooseTimeScreen'
import ChooseDayScreen from '../screens/AddSchedule/ChooseDayScreen'
import SetLimitsScreen from '../screens/AddShade/SetLimitsScreen'
import EnterShadeIdScreen from '../screens/AddShade/EnterShadeIdScreen'
import React from 'react'
import { Icon } from 'react-native-elements'

const ShadeStackNavigator = createStackNavigator({
  ControlScreen: {
    screen: ControlPanelScreen,
    navigationOptions: {
      header: null,
    },
  },
  SetLimits: {
    screen: SetLimitsScreen,
  },
  EnterShadeId: {
    screen: EnterShadeIdScreen
    } 
  },{
})

const ScheduleStackNavigator = createStackNavigator({
  Main: {
    screen: ScheduleScreen,
    navigationOptions: {
      header: null,
    },
  },
  ChooseShade: {
    screen: ChooseShadeScreen,
  },
  ChooseTime: ChooseTimeScreen,
  ChooseDay: ChooseDayScreen
}, {

  }
)

const MainTabNavigator = createMaterialTopTabNavigator({
  Shades: ShadeStackNavigator,
  // Rooms: RoomsScreen,
  Schedule: ScheduleStackNavigator,
  },{
  tabBarOptions: {
    labelStyle: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    style: {
      backgroundColor: '#1AA89E',
    },
  }, 
})

const LoginNavigator = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  MainTab: {
    screen: MainTabNavigator,
    navigationOptions: () => ({
      headerRight: (
        <Icon name="person" 
        size={30} 
        color="#1AA89E" 
        />
      ),
    }),
  },
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F373E',
      borderBottomWidth: 0
    },
  },
})

export default createAppContainer(LoginNavigator)