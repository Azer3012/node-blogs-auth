import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Chat, Dashboard, MyBlogs, Profile } from '../screens'
import helpers from '../helpers/helpers'
import { isIphoneX } from 'react-native-iphone-x-helper'
import AnimatedTabButton from '../components/AnimatedTabButton'
import colors from '../values/colors'

const Tab=createBottomTabNavigator()
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
      initialRouteName={'dashboard'}
    >
        <Tab.Screen name="dashboard" component={Dashboard}
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
        <Tab.Screen name="myBlogs" component={MyBlogs}
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
        <Tab.Screen name="profile" component={Profile}
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