import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function NotFoundScreen() {
  return (
   <>
   <View style={styles.container}>
    <Link href={"/"} style={styles.button}>Goto HomePage</Link>
   </View>
 
   </>
  )
}
const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"#25292e",
    justifyContent:"center",
    alignItems:"center"
},
button:{
    color:"rgba(235, 153, 12, 0.96)",
    fontSize:20,
    textDecorationColor:"rgba(235, 153, 12, 0.6)",
    textDecorationLine:"underline"
}
})