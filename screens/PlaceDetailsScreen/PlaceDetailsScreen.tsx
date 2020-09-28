import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import DefaultText from '../../components/UI/DefaultText/DefaultText';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import MapPreview from '../../components/MapPreview/MapPreview';
import { Place } from '../../models/Place';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';

type PlaceDetailsScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PlaceDetails'>;
type PlaceDetailsScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PlaceDetails'>;
type PlaceDetailsScreenProps = {
    navigation: PlaceDetailsScreenStackNavigationProp,
    route: PlaceDetailsScreenRouteProp
};

const PlaceDetailsScreen = (props: PlaceDetailsScreenProps) => {

    const place: Place = props.route.params.place;

    const onShowMap = () => {
        props.navigation.push(PlacesNavigatePath.PLACES_MAP, { place: place });
    };

    const onShowFullPhoto = () => {
        props.navigation.navigate(PlacesNavigatePath.PHOTO_MODAL, { uri: place.imageUri })
    }

    return (
        <ScrollView contentContainerStyle={ styles.screen }>
            <View style={ styles.photoContainer }>
                <PhotoPreview uri={ place.imageUri } onPress={ onShowFullPhoto }/>
            </View>
            <View style={ styles.locationContainer }>
                <MapPreview location={ place.location } onPress={ onShowMap }/>
            </View>
            <View style={ styles.descriptionContainer }>
                <DefaultText style={ styles.description }>
                    { place.description }
                </DefaultText>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    photoContainer: {
        width: '100%',
        height: 300
    },
    locationContainer: {
        marginVertical: 10,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30
    },
    description: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'center'
    }
});

export const placeDetailsScreenNavigationOptions = (props: PlaceDetailsScreenProps) => {
    return {
        headerTitle: props.route.params.place.name
    } as StackNavigationOptions;
};

export default PlaceDetailsScreen;
