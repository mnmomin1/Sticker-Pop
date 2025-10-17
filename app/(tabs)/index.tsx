import Button from "@/components/Button"
import CircleButton from "@/components/CircleButton"
import EmojiList from "@/components/EmojiList"
import EmojiPicker from "@/components/EmojiPicker"
import EmojiSticker from "@/components/EmojiSticker"
import IconButton from "@/components/IconButton"
import ImageViewer from "@/components/ImageViewer"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import React, { useRef } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { captureRef } from "react-native-view-shot"

const PlaceholderImage = require("../../assets/images/background-image.png")

export default function Index() {
  const imageRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [showAppOptions, setshowAppOptions] = React.useState<boolean>(false);
  const [isModeVisiable, setisModeVisiable] = React.useState<boolean>(false);
  const [stickers, setStickers] = React.useState<string[]>([]);
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setshowAppOptions(false);
    } else {
      alert("You did not select any image.");
    }
  }

  const onReset = () => {
    setSelectedImage(null);
    setshowAppOptions(false);
    setStickers([]);
  }

  const onAddSticker = () => {
    setisModeVisiable(true);
  }

  const onsaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      Alert.alert("Saved!", "Your image has been saved to the gallery!");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to save the image.");
    }
  };

  const onModalClose = () => {
    setisModeVisiable(false);
  }

  return (
    <View style={styles.container}>
      <View ref={imageRef} style={styles.imageContainer} collapsable={false}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
        {stickers.map((stickers, Index)=>(
          <View key={Index} style={styles.stickerContainer}>
            <EmojiSticker imageSize={40} stickersource={stickers}/>
            </View>
        ))}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save" label="Save" onPress={onsaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setshowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisiable={isModeVisiable} onClose={onModalClose}>
        <EmojiList onSelect={(emoji) => setStickers((prev) =>[...prev, emoji])}
          onCloseModal={onModalClose}/>
      </EmojiPicker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    
  },
  stickerContainer: {
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainer: {
   
   
     flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "transparent"
  }
})