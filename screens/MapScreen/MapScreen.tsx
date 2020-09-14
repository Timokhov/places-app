import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MapView, { MapEvent, Region, Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { Location } from '../../models/Location';

type MapScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'Map'>;
type MapScreenRouteProp = RouteProp<PlacesNavigatorParams, 'Map'>;
type MapScreenProps = {
    navigation: MapScreenStackNavigationProp,
    route: MapScreenRouteProp
};

const MapScreen = (props: MapScreenProps) => {

    const [location, setLocation] = useState<Location>();

    const onSave = useCallback(() => {
        props.navigation.navigate('NewPlace', { locationFromMap: location });
    }, [location]);

    useEffect(() => {
        if (location) {
            props.navigation.setOptions({
                headerRight: () => {
                    return (
                        <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                            <Item title='Save location'
                                  iconName='ios-save'
                                  onPress={ onSave }
                            />
                        </HeaderButtons>
                    );
                }
            });
        }
    }, [onSave]);

    const mapRegion: Region = {
        latitude: 37.5,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const onSelectLocation = (event: MapEvent) => {
        setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    };

    return (
        <MapView style={ styles.map } region={ mapRegion } onPress={ onSelectLocation }>
            {
                location && <Marker title="Picked Location" coordinate={ location }/>
            }
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export const mapScreenNavigationOptions = (props: MapScreenProps) => {
    return {
        headerTitle: ''
    } as StackNavigationOptions;
};

export default MapScreen;
