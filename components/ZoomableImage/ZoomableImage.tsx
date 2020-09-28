import React from 'react';
import { Animated, ImageStyle, StyleSheet } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

interface ZoomableImageProps {
    uri: string,
    style?: ImageStyle
}

const ZoomableImage = (props: ZoomableImageProps) => {

    const scale = new Animated.Value(1);

    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: { scale: scale }
            }
        ],
        {
            useNativeDriver: true
        }
    );

    const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    };

    return (
        <PinchGestureHandler onGestureEvent={ onGestureEvent }
                             onHandlerStateChange={ onPinchStateChange }>
            <Animated.Image style={{ ...styles.image, ...props.style, transform: [{ scale: scale }] }}
                            source={{ uri: props.uri }}/>
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1
    }
})

export default ZoomableImage;
