import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, Text, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { COLORS } from '../../constants/colors';

interface ImagePickerProps {
    onImageTaken: (imageUri: string) => void
}

const ImagePicker = (props: ImagePickerProps) => {

    const [imageUri, setImageUri] = useState('');

    const verifyCameraPermissions = async () => {
        const result: PermissionResponse = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== PermissionStatus.GRANTED) {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permission to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }

        return true;
    };

    const onTakeImage = async () => {
        const hasCameraPermission: boolean = await verifyCameraPermissions();
        if (hasCameraPermission) {
            const imageResult: ImagePickerResult = await ExpoImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            });
            if (!imageResult.cancelled) {
                setImageUri(imageResult.uri);
                props.onImageTaken(imageResult.uri);
            }
        }
    };

    return (
        <View style={ styles.imagePicker }>
            <View style={ styles.imagePreview }>
                {
                    imageUri
                        ? <Image style={ styles.image } source={{ uri: imageUri }}/>
                        : <Text>No image picked yet.</Text>
                }
            </View>
            <Button title="Take Image" onPress={ onTakeImage } color={ COLORS.primary }/>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderColor: COLORS.common,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImagePicker;
