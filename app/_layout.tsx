import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
   <StatusBar style="light" />
  <Stack>
    <Stack.Screen name='(tabs)'
    options={{headerTitle:"Sticker Smash",
      headerShown:false,
     headerStyle:{ backgroundColor:"#25292e"}
    }}/>
      <Stack.Screen name='+not-found' options={{
        title:"Oops! Not Found.",
        headerTitleAlign:"center",
        // headerBackVisible:false
       }}/>
  </Stack>
  </GestureHandlerRootView>
 
  )
}