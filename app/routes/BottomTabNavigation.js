import  React,{ useEffect, useRef }  from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


import HomeScreen from '../screens/home/Home';
import ProfileScreen from '../screens/home/profile/Profile';


//drawer
import FAQ from '../screens/home/faq/Faq';
import Setting from '../screens/home/setting/Setting';

import CustomDrawer from '../components/CustomDrawer';
import Icon,{Icons} from '../components/Icons';
import {colors} from '../config/styles';
import ExerciseJournal from '../screens/home/exerciseJournal/ExerciseJournal';



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabArr=[
  { route: 'Home', label: 'Home', type: Icons.FontAwesome5, icon: 'home', component: HomeScreen },
  { route: 'Profile', label: 'Profile', type: Icons.Ionicons, icon: 'ios-person', component: ProfileScreen },
  
  // { route: 'Levels', label: 'Battle Marks', type: Icons.Ionicons, icon: 'md-checkmark-done-circle', component: BattleMarks },
  // { route: 'Profile', label: 'Profile', type: Icons.AntDesign, icon: 'setting', component: ProfileMain },
  // { route: 'Search', label: 'Search', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline', component: ColorScreen },
  // { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: ColorScreen },
]




const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  // useEffect(() => {
  //   if (focused) {
  //     viewRef.current.animate(animate1);
  //     circleRef.current.animate(circle1);
  //     textRef.current.transitionTo({ scale: 1 });
  //   } else {
  //     viewRef.current.animate(animate2);
  //     circleRef.current.animate(circle2);
  //     textRef.current.transitionTo({ scale: 0 });
  //   }
  // }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <View

        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
        <Icon type={item.type} name={item.icon} color={focused ? colors.white : colors.blackColor} />
         
        </View>
        {/* <Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Text> */}
      </View>
    </TouchableOpacity>
  )
}

export const BottomTabs = () => {
  return (
    <Tab.Navigator
     // tabBar={(props) => <OffTripBottomTabContent {...props} onTrip={true} backBehavior='history'/>}
      initialRouteName="Home">
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              headerShown:false,
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
};

const DrawerArr=[
  {  screen: BottomTabs, iconName:'home-outline', name:'Home Screen' },
  {  screen: ExerciseJournal, iconName:'home-outline', name:'Exercise Journal' },
  {  screen: FAQ, iconName:'home-outline', name:'FAQ' },
  {  screen: Setting, iconName:'home-outline', name:'Setting' },
]






export const DrawerNavigation = () => {
  let screens = [];
  for (let key in DrawerArr) {
    if (DrawerArr.hasOwnProperty(key)) {
      screens.push(
        <Drawer.Screen
          key={key}
          name={DrawerArr[key].name}
          component={DrawerArr[key].screen}
          options={{
            drawerIcon: ({color})=>(
              <Ionicons name={DrawerArr[key].iconName} size={22} color={color}/>
            )
          }}
        />,
      );
    }
  }
  return (
    <Drawer.Navigator

      screenOptions={{
        headerShown: false,
      }} 
      drawerContent={props=><CustomDrawer {...props}/>}
      >
      {screens}
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    
    borderRadius: 16,
  },
  btn: {
    width: 50,



    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor1,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.primaryColor1,
  }
})

