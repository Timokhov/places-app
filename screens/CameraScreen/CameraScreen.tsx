import React, { useEffect, useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { Action, Dispatch } from 'redux';
import * as ExpoPermissions from 'expo-permissions';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { Alert, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { Camera, CameraType } from 'expo-camera';
import CameraActions from '../../components/CameraActions/CameraActions';
import { FlashMode } from '../../models/FlashMode';
import { Nullable } from '../../models/Nullable';
import { CameraCapturedPicture } from 'expo-camera/src/Camera.types';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';

type CameraScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'Camera'>;
type CameraScreenRouteProp = RouteProp<PlacesNavigatorParams, 'Camera'>;
type CameraScreenProps = {
    navigation: CameraScreenStackNavigationProp,
    route: CameraScreenRouteProp
};

const CameraScreen = (props: CameraScreenProps) => {

    const [flashMode, setFlashMode] = useState<FlashMode>('off');
    const [cameraType, setCameraType] = useState(CameraType.back);
    const dispatch: Dispatch<Action> = useDispatch();

    let cameraRef: Nullable<Camera>;

    useEffect(() => {
        return props.navigation.addListener('focus', verifyPermissions);
    }, []);

    const verifyPermissions = async () => {
        try {
            const result: PermissionResponse = await ExpoPermissions.askAsync(ExpoPermissions.CAMERA, ExpoPermissions.CAMERA_ROLL);
            if (result.status !== PermissionStatus.GRANTED) {
                showPermissionsError();
            }
        } catch (error) {
            showPermissionsError();
        }
    };

    const showPermissionsError = () => {
        Alert.alert(
            'Permissions Error!',
            'You need to grand camera permissions.',
            [
                { text: 'Go Back', onPress: () => props.navigation.goBack() },
                { text: 'Try Again', onPress: () => verifyPermissions() }
            ]
        );
    };

    const onCapturePhoto = async () => {
        if (cameraRef) {
            const photo: CameraCapturedPicture = await cameraRef.takePictureAsync();
            if (photo) {
                dispatch(NewPlaceActions.setImageUri(photo.uri));
                if (props.route.params?.navigateTo) {
                    props.navigation.navigate(props.route.params.navigateTo);
                } else {
                    props.navigation.navigate('SelectLocation');
                }
            }
        }
    };

    return (
        <View style={ styles.screen }>
            <Camera ref={ ref => cameraRef = ref }
                    style={ styles.camera }
                    flashMode={ flashMode }
                    type={ cameraType }
                    ratio={"16:9"}>
                <CameraActions flashMode={ flashMode }
                               onSwitchFlashMode={ setFlashMode }
                               onCapturePhoto={ onCapturePhoto }
                               cameraType={ cameraType }
                               onSwitchCameraType={ setCameraType }/>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});

export const cameraScreenNavigationOptions = (props: CameraScreenProps) => {
    return {
        headerTitle: 'Take Picture'
    } as StackNavigationOptions;
};

export default CameraScreen;
