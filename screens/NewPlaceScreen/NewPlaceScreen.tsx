import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';

type NewPlaceScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenRouteProp = RouteProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenProps = {
    navigation: NewPlaceScreenStackNavigationProp,
    route: NewPlaceScreenRouteProp
};

const NewPlaceScreen = (props: NewPlaceScreenProps) => {
    return (
        <View style={ styles.screen }>
            <Text>NewPlaceScreen</Text>
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

export const newPlaceScreenNavigationOptions = (props: NewPlaceScreenProps) => {
    return {
        headerTitle: 'New Place'
    } as StackNavigationOptions;
};

export default NewPlaceScreen;
