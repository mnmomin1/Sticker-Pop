import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
export default function Tabslayout() {
  return (
    
   
  <Tabs
   screenOptions={{
    tabBarActiveTintColor: "rgba(236, 145, 8, 1)",
    tabBarStyle:{ backgroundColor:"#25292e"},
    headerStyle:{ backgroundColor:"#25292e" },
    headerTintColor:"white",
    tabBarInactiveTintColor:"gray",
    
   }}
   >
    <Tabs.Screen name='index'
    options={{
       tabBarLabel: "Home",
        headerTitle:"Sticker Smash",
        headerTitleAlign:'center',
        tabBarIcon:({focused, color}) => 
        <Ionicons
         name={focused ? "home":"home-outline"}
          size={24}
          color={color}  />,  
           
    }}
    />
    <Tabs.Screen name='about'
    options={{headerTitle: "About",
       tabBarLabel: "About",
        headerTitleAlign:'center',
        tabBarIcon:({focused, color}) =>
          <Ionicons
          name={focused? "information-circle":"information-circle-outline"}
          size={24}
          color={color}/>
    }}/>
    
  </Tabs>
  
  )
}