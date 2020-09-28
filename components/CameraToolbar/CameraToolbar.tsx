import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraType } from 'expo-camera';
import { COLORS } from '../../constants/colors';
import { FlashMode } from '../../models/FlashMode';
import CameraAction from '../CameraAction/CameraAction';

interface CameraToolbarProps {
    flashMode: FlashMode,
    onSwitchFlashMode: (newMode: FlashMode) => void,
    onCapturePhoto: () => void
    cameraType: CameraType,
    onSwitchCameraType: (newType: CameraType) => void
}

const CameraToolbar = (props: CameraToolbarProps) => {

    const onSwitchFlashMode = () => {
        props.flashMode === 'torch'
            ? props.onSwitchFlashMode('off')
            : props.onSwitchFlashMode('torch');
    };

    const onSwitchCameraType = () => {
        props.cameraType === CameraType.back
            ? props.onSwitchCameraType(CameraType.front)
            : props.onSwitchCameraType(CameraType.back);
    };

    return(
        <View style={ styles.cameraToolbar }>
            <CameraAction iconName={ props.flashMode === 'torch' ? 'ios-flash' : 'ios-flash-off' }
                          onPress={ onSwitchFlashMode }/>
            <CameraAction style={ styles.captureAction }
                          iconName="ios-aperture"
                          onPress={ props.onCapturePhoto }/>
            <CameraAction iconName="ios-reverse-camera"
                          onPress={ onSwitchCameraType }/>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20
    },
    captureAction: {
        borderWidth: 2,
        borderColor: COLORS.primary
    }
});

export default CameraToolbar;
