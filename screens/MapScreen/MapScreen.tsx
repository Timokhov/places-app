import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';

type MapScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'Map'>;
type MapScreenRouteProp = RouteProp<PlacesNavigatorParams, 'Map'>;
type MapScreenProps = {
    navigation: MapScreenStackNavigationProp,
    route: MapScreenRouteProp
};

const MapScreen = (props: MapScreenProps) => {
    return (
        <View style={ styles.screen }>
            <Text>MapScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const mapScreenNavigationOptions = (props: MapScreenProps) => {
    return {
        headerTitle: 'Map'
    } as StackNavigationOptions;
};

export default MapScreen;
