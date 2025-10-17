import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  isVisiable: boolean;
  children: React.ReactNode;
  onClose: ()=> void;
}
export default function EmojiPicker({isVisiable, children, onClose}: Props) {
    return(
        <Modal animationType='slide' visible={isVisiable} transparent={true}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name='close' size={20} color="#fff"/>
                        </Pressable>
                </View>
                {children}
                </View>
            </Modal>
    )
}
const styles = StyleSheet.create({
    modalContent:{
        height:"25%",
        width:"100%",
        backgroundColor:"#25292e",
        position:"absolute",
        borderTopRightRadius:18,
        borderTopLeftRadius:18,
        bottom:0,
    },
        titleContainer:{
            height:"16%",
            backgroundColor:"#464a4e",
            borderTopRightRadius:10,
            borderTopLeftRadius:10,
            paddingHorizontal:20,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
        },
        title:{
            color:"#fff",
        }
})