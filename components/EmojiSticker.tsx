import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
    imageSize: number;
    stickersource: string;
}

export default function EmojiSticker({ imageSize, stickersource }: Props) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const [visible, setVisible] = React.useState(true);
    const textStyle = useAnimatedStyle(() => {
        return {
            fontSize: withSpring(scaleImage.value - 20),
            lineHeight: scaleImage.value,
        }
    });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250) // Maximum time between taps
        .onStart(() => {

            if (scaleImage.value === imageSize) {
                scaleImage.value = imageSize * 2;
            } else {
                scaleImage.value = imageSize;
            }
        });

    const drag = Gesture.Pan()
        .onBegin(() => {

        })
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        })
        .onEnd(() => {

        });

     const longPress = Gesture.LongPress().onStart(() => {
    runOnJS(setVisible)(false);
  });
    // Use Race instead of Simultaneous for better gesture recognition
    const composedGesture = Gesture.Race(drag, doubleTap, longPress);

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    });
    if (!visible) return null;
    return (
        <View style={styles.wrapper}>
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={[containerStyle, styles.container]}>
                    <Animated.Text style={[textStyle, styles.emojiText]}>
                        {stickersource}
                    </Animated.Text>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {

        top: -100,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        // Container for the animated emoji
        position: 'absolute',
    },
    emojiText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'transparent',
        includeFontPadding: false,
    },
});