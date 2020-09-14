import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import MapPreview from '../../components/LocationPicker/MapPreview/MapPreview';
import { Place } from '../../models/Place';
import { COLORS } from '../../constants/colors';

type PlaceDetailsScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PlaceDetails'>;
type PlaceDetailsScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PlaceDetails'>;
type PlaceDetailsScreenProps = {
    navigation: PlaceDetailsScreenStackNavigationProp,
    route: PlaceDetailsScreenRouteProp
};

const PlaceDetailsScreen = (props: PlaceDetailsScreenProps) => {

    const place: Place = props.route.params.place;

    const onShowMap = () => {
        props.navigation.navigate('Map', { initialLocation: place.location, readonly: true });
    };

    return (
        <ScrollView contentContainerStyle={ styles.screen }>
            <Image style={ styles.image } source={{ uri: place.imageUri }}/>
            <View style={ styles.locationContainer }>
                <View style={ styles.addressContainer }>
                    <Text style={ styles.address }>{ place.address }</Text>
                </View>
                <MapPreview location={ place.location } onPress={ onShowMap }/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: COLORS.common
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: COLORS.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export const placeDetailsScreenNavigationOptions = (props: PlaceDetailsScreenProps) => {
    return {
        headerTitle: props.route.params.place.title
    } as StackNavigationOptions;
};

export default PlaceDetailsScreen;
