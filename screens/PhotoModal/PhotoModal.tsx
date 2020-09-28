import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RootNavigatorParams } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ZoomableImage from '../../components/ZoomableImage/ZoomableImage';

type PhotoModalStackNavigationProp = StackNavigationProp<RootNavigatorParams, 'PhotoModal'>;
type PhotoModalRouteProp = RouteProp<RootNavigatorParams, 'PhotoModal'>;
type PhotoModalProps = {
    navigation: PhotoModalStackNavigationProp,
    route: PhotoModalRouteProp
};
const PhotoModal = (props: PhotoModalProps) => {

    const uri: string  = props.route.params.uri;

    return (
        <View style={ styles.photoModal }>
            <View style={ styles.backdrop }/>
            <View style={ styles.photoContainer }>
                <ZoomableImage uri={ uri }/>
                <View style={ styles.closeContainer }>
                    <TouchableOpacity onPress={ props.navigation.goBack }>
                        <View style={ styles.close }>
                            <Ionicons name="ios-close"
                                      size={ 30 }
                                      color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    photoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.8
    },
    photoContainer: {
        width: '90%',
        height: '90%'
    },
    closeContainer: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    close: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.8
    }
});

export const photoModalNavigationOptions = (props: PhotoModalProps) => {
    return {
        gestureEnabled: true,
        gestureDirection: 'vertical',
        cardStyle: { backgroundColor: "transparent" }
    } as StackNavigationOptions;
};

export default PhotoModal;
