import React from 'react';
import { View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

interface PhotoPreviewProps {
    uri: string,
    onPress?: () => void
}

const PhotoPreview = (props: PhotoPreviewProps) => {
    return (
        <TouchableNativeFeedback onPress={ props.onPress } useForeground>
            <View style={ styles.imageContainer }>
                <Image style={ styles.image } source={{ uri: props.uri }}/>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '100%'
    },
    image: {
        flex: 1
    }
})

export default PhotoPreview;
