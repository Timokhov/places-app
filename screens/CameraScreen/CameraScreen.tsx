import React, { useEffect, useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { Action, Dispatch } from 'redux';
import * as ExpoPermissions from 'expo-permissions';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { Camera, CameraType } from 'expo-camera';
import CameraToolbar from '../../components/CameraToolbar/CameraToolbar';
import { FlashMode } from '../../models/FlashMode';
import { Nullable } from '../../models/Nullable';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';

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
        const unsubscribeFromFocus = props.navigation.addListener('focus', verifyPermissions);
        const unsubscribeFromBeforeRemove = props.navigation.addListener('beforeRemove', () => {
            dispatch(NewPlaceActions.stopCapturePhoto());
        });
        return () => {
            unsubscribeFromFocus();
            unsubscribeFromBeforeRemove();
        }
    }, []);

    const verifyPermissions = async () => {
        try {
            const result: PermissionResponse = await ExpoPermissions.askAsync(ExpoPermissions.CAMERA);
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

    const onCapturePhoto = () => {
        if (cameraRef) {
            const navigateTo: PlacesNavigatePath = props.route.params?.navigateTo
                ? props.route.params?.navigateTo
                : PlacesNavigatePath.PICK_LOCATION;
            dispatch(NewPlaceActions.capturePhoto(cameraRef, navigateTo));
        }
    };

    return (
        <View style={ styles.screen }>
            <Camera ref={ ref => cameraRef = ref }
                    style={ styles.camera }
                    flashMode={ flashMode }
                    type={ cameraType }
                    ratio={"16:9"}>
                <CameraToolbar flashMode={ flashMode }
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
