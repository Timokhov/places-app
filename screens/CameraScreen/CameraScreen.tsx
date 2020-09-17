import React, { useEffect } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { ImagePickerResult } from 'expo-image-picker';
import { Action, Dispatch } from 'redux';
import * as ExpoPermissions from 'expo-permissions';
import * as ExpoImagePicker from 'expo-image-picker';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenLoader from '../../components/UI/ScreenLoader/ScreenLoader';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';

type CameraScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'Camera'>;
type CameraScreenRouteProp = RouteProp<PlacesNavigatorParams, 'Camera'>;
type CameraScreenProps = {
    navigation: CameraScreenStackNavigationProp,
    route: CameraScreenRouteProp
};

const CameraScreen = (props: CameraScreenProps) => {

    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        return props.navigation.addListener('focus', takePhoto);
    }, []);

    const takePhoto = async () => {
        try {
            const result: PermissionResponse = await ExpoPermissions.askAsync(ExpoPermissions.CAMERA, ExpoPermissions.CAMERA_ROLL);
            if (result.status === PermissionStatus.GRANTED) {
                const imageResult: ImagePickerResult = await ExpoImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [16, 9],
                    quality: 0.5
                });
                if (!imageResult.cancelled) {
                    dispatch(NewPlaceActions.setImageUri(imageResult.uri));
                    if (props.route.params?.navigateTo) {
                        props.navigation.navigate(props.route.params.navigateTo);
                    } else {
                        props.navigation.navigate('Map');
                    }
                } else {
                    props.navigation.goBack();
                }
            } else {
                showTakePhotoError();
            }
        } catch (error) {
            showTakePhotoError();
        }
    };

    const showTakePhotoError = () => {
        Alert.alert(
            'An error occurred!',
            'Unexpected error while taking photo.',
            [
                { text: 'Go Back', onPress: () => props.navigation.goBack() },
                { text: 'Try Again', onPress: () => takePhoto() }
            ]
        );
    };

    return <ScreenLoader/>;
};

export const cameraScreenNavigationOptions = (props: CameraScreenProps) => {
    return {
        headerTitle: ''
    } as StackNavigationOptions;
};

export default CameraScreen;
