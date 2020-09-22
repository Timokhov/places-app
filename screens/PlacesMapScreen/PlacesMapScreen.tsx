import React, { useEffect, useState } from 'react';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Place } from '../../models/Place';
import { RootState } from '../../store/store';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import PlaceMarker from '../../components/PlaceMarker/PlaceMarker';
import { MAP_DELTA } from '../../constants/map';
import { Nullable } from '../../models/Nullable';


type PlacesMapScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PlacesMap'>;
type PlacesMapScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PlacesMap'>;
type PlacesMapScreenProps = {
    navigation: PlacesMapScreenStackNavigationProp,
    route: PlacesMapScreenRouteProp
};

const PlacesMapScreen = (props: PlacesMapScreenProps) => {

    const initialPlace: Nullable<Place> = props.route.params?.place;

    const places: Place[] = useSelector(
        (state: RootState) => state.placesState.places
    );
    const [mapRegion, setMapRegion] = useState<Region>();

    useEffect(() => {
        if (initialPlace) {
            setMapRegion({
                latitude: initialPlace.location.latitude,
                longitude: initialPlace.location.longitude,
                latitudeDelta: MAP_DELTA.latitudeDelta,
                longitudeDelta: MAP_DELTA.longitudeDelta
            });
        }
    }, []);

    const onMarkerPress = (place: Place) => {
        props.navigation.navigate('PlaceDetails', { place: place });
    };

    return (
        <View style={ styles.screen }>
            <MapView style={ styles.map } region={ mapRegion } showsUserLocation>
                {
                    places.map(place => {
                        return <PlaceMarker key={ place.id }
                                            place={ place }
                                            onPress={ onMarkerPress }/>;
                    })
                }
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export const placesMapScreenNavigationOptions = (props: PlacesMapScreenProps) => {
    return {
        headerTitle: 'All Places Map'
    } as StackNavigationOptions;
};

export default PlacesMapScreen;
