import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';

type PlaceDetailsScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PlaceDetails'>;
type PlaceDetailsScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PlaceDetails'>;
type PlaceDetailsScreenProps = {
    navigation: PlaceDetailsScreenStackNavigationProp,
    route: PlaceDetailsScreenRouteProp
};

const PlaceDetailsScreen = (props: PlaceDetailsScreenProps) => {
    return (
        <View style={ styles.screen }>
            <Text>PlaceDetailsScreen</Text>
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

export const placeDetailsScreenNavigationOptions = (props: PlaceDetailsScreenProps) => {
    return {
        headerTitle: props.route.params.place.title
    } as StackNavigationOptions;
};

export default PlaceDetailsScreen;
