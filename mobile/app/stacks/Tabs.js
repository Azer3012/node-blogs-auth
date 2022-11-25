import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BlogDetail, Chat, CreateBlog, Dashboard, EditProfile, MyBlogs, Profile } from '../screens'
import helpers from '../helpers/helpers'
import { isIphoneX } from 'react-native-iphone-x-helper'
import AnimatedTabButton from '../components/AnimatedTabButton'
import colors from '../values/colors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Tab=createBottomTabNavigator()
const Stack=createNativeStackNavigator()

const DashboardStack=()=>{
  return (
    <Stack.Navigator screenOptions={helpers.screenOptions}>
      <Stack.Screen name="dashboard" component={Dashboard}/>
      <Stack.Screen name="blogDetail" component={BlogDetail}/>
    </Stack.Navigator>
  )
}
const MyBlogStack=()=>{
  return (
    <Stack.Navigator screenOptions={helpers.screenOptions}>
      <Stack.Screen name="myBlogs" component={MyBlogs}/>
      <Stack.Screen name="createBlog" component={CreateBlog}/>
    </Stack.Navigator>
  )
}
const AccountStack=()=>{
  return (
    <Stack.Navigator screenOptions={helpers.screenOptions}>
      <Stack.Screen name="profile" component={Profile}/>
      <Stack.Screen name="editProfile" component={EditProfile}/>
     
    </Stack.Navigator>
  )
}
const Tabs = () => {


  
  return (
    <Tab.Navigator
    
    screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        tabBarStyle: {
          ...styles.tabBarStyle,
          height: isIphoneX() ? helpers.px(85) : helpers.px(70),
          paddingTop: isIphoneX() ? helpers.px(14) : helpers.px(18),
        },
        tabBarShowLabel: false,
      }}
      backBehavior="initialRoute"
      initialRouteName={'dashboardTab'}
    >
        <Tab.Screen name="dashboardTab" component={DashboardStack}
        options={() => ({
            tabBarButton: props => {
             return ( <AnimatedTabButton
                label={'Dashboard'}
                icon={require('../assets/images/dashboard.png')}
                addStyle={styles.tabButton}
                {...props}
              />)
            },
            tabBarShowLabel: false,
          })}
        
        
        />
        <Tab.Screen name="myBlogsTab" component={MyBlogStack}
        options={() => ({
            tabBarButton: props => {
             return ( <AnimatedTabButton
                label={'My Blogs'}
                icon={require('../assets/images/blog.png')}
                addStyle={styles.tabButton}
                {...props}
              />)
            },
            tabBarShowLabel: false,
          })}
        
        
        />
        <Tab.Screen name="chat" component={Chat}
        options={() => ({
            tabBarButton: props => {
             return ( <AnimatedTabButton
                label={'Chat'}
                icon={require('../assets/images/chat.png')}
                addStyle={styles.tabButton}
                {...props}
              />)
            },
            tabBarShowLabel: false,
          })}
        
        
        />
        <Tab.Screen name="account" component={AccountStack}
        options={() => ({
            tabBarButton: props => {
             return ( <AnimatedTabButton
                label={'Profile'}
                icon={require('../assets/images/profile.png')}
                addStyle={styles.tabButton}
                {...props}
              />)
            },
            tabBarShowLabel: false,
          })}
        
        
        />
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: colors.white,
        elevation: 1,
        borderTopWidth: 0,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: helpers.px(0),
          height: helpers.px(-8),
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      icon: {},
      tabButton: {
        width: helpers.px(20),
        height: helpers.px(20),
      },
})