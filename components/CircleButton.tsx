import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
type Props = {
    onPress: () => void;
}
export default function CircleButton({ onPress }: Props) {
    return (
        <View style={[styles.circleButtonContainer, 
            { borderColor: "rgba(236, 145, 8, 1)", borderWidth: 2, borderRadius: 42 }
            ]}>
            <Pressable style={styles.circleButton} onPress={onPress}>
            <MaterialIcons name='add' size={35} color="rgba(31, 30, 28, 1)" /   >
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    circleButtonContainer: {
        width: 84,
        height: 84,
        borderRadius: 30,
        marginHorizontal: 60,
         justifyContent: "center",
        alignItems: "center",
    },
    circleButton: {
        width: 70,
        height: 70,
        backgroundColor: "#fdf6c8ff", 
        justifyContent: "center",
        alignItems: "center",
        
        borderRadius: 42,}
})