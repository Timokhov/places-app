import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraType,  } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { FlashMode } from '../../models/FlashMode';

interface CameraActionsProps {
    flashMode: FlashMode,
    onSwitchFlashMode: (newMode: FlashMode) => void,
    onCapturePhoto: () => void
    cameraType: CameraType,
    onSwitchCameraType: (newType: CameraType) => void
}

const CameraActions = (props: CameraActionsProps) => {

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
        <View style={ styles.cameraActions }>
            <TouchableOpacity onPress={ onSwitchFlashMode }>
                <View style={ styles.action }>
                    <Ionicons name={props.flashMode === 'torch' ? 'ios-flash' : 'ios-flash-off' }
                              size={ 40 }
                              color={ COLORS.primary }/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ props.onCapturePhoto }>
                <View style={{ ...styles.action, ...styles.captureAction }}>
                    <Ionicons name="ios-aperture"
                              size={ 40 }
                              color={ COLORS.primary }/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ onSwitchCameraType }>
                <View style={ styles.action }>
                    <Ionicons name="ios-reverse-camera"
                              size={ 40 }
                              color={ COLORS.primary }/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20
    },
    action: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden'
    },
    captureAction: {
        borderWidth: 2,
        borderColor: COLORS.primary
    }
});

export default CameraActions;
