import React from 'react';
import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface CameraActionProps {
    iconName: string,
    onPress: () => void,
    style?: ViewStyle
}

const CameraAction = (props: CameraActionProps) => {
    return (
        <TouchableOpacity onPress={ props.onPress }>
            <View style={{ ...styles.cameraAction, ...props.style }}>
                <Ionicons name={ props.iconName }
                          size={ 40 }
                          color={ COLORS.primary }/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cameraAction: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden'
    }
})

export default CameraAction;
