import React, { useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';
import { LocationData } from 'expo-location/src/Location';
import * as ExpoPermissions from 'expo-permissions';
import { PermissionResponse,PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Alert, Button, StyleSheet, View } from 'react-native';
import MapView, { MapEvent, Region, Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { COLORS } from '../../constants/colors';
import { MAP_DELTA } from '../../constants/map';
import { GoogleGeocodeResponse } from '../../models/Google';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { Location } from '../../models/Location';
import { Nullable } from '../../models/Nullable';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';
import * as GoogleService from '../../services/google.service';

type MapScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'Map'>;
type MapScreenRouteProp = RouteProp<PlacesNavigatorParams, 'Map'>;
type MapScreenProps = {
    navigation: MapScreenStackNavigationProp,
    route: MapScreenRouteProp
};

const MapScreen = (props: MapScreenProps) => {

    const readonly: Nullable<boolean> = props.route.params?.readonly;
    const initialLocation: Nullable<Location> = props.route.params?.initialLocation;

    const [location, setLocation] = useState<Location>();
    const [isGetMyLocationInProgress, setGetMyLocationInProgress] = useState(false);
    const [isAddressSearchInProgress, setAddressSearchInProgress] = useState(false);
    const [mapRegion, setMapRegion] = useState<Region>();

    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        if (initialLocation) {
            setLocation(initialLocation);
            updateMapRegion(initialLocation);
        } else {
            getMyLocation();
        }
    }, []);

    useEffect(() => {
        if (!readonly && location) {
            props.navigation.setOptions({
                headerRight: () => {
                    return (
                        <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                            <Item title='Save location'
                                  iconName='ios-save'
                                  onPress={ () => {
                                      dispatch(NewPlaceActions.setLocation(location));
                                      props.navigation.navigate('NewPlace');
                                  } }
                            />
                        </HeaderButtons>
                    );
                }
            });
        }

        if (location && location.address) {
            props.navigation.setOptions({
                headerTitle: location.address
            });
        }

    }, [readonly, location, dispatch]);

    useEffect(() => {
        if (isAddressSearchInProgress) {
            props.navigation.setOptions({
                headerTitle: 'Loading...'
            });
        }
    }, [isAddressSearchInProgress]);

    const getMyLocation = async () => {
        setGetMyLocationInProgress(true);
        try {
            const result: PermissionResponse = await ExpoPermissions.askAsync(ExpoPermissions.LOCATION);
            if (result.status === PermissionStatus.GRANTED) {

                const result: LocationData = await ExpoLocation.getCurrentPositionAsync({ timeout: 5000 });
                const address: string = await findAddress(result.coords.latitude, result.coords.longitude);
                const userLocation: Location = {
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude,
                    address: address
                };
                setLocation(userLocation);
                updateMapRegion(userLocation);
            } else {
                showGetMyLocationError();
            }
        } catch (error) {
            showGetMyLocationError();
        }
        setGetMyLocationInProgress(false);
    };

    const showGetMyLocationError = () => {
        Alert.alert(
            'Could not fetch location.',
            'Please try again later or pick a location on the map.',
            [{ text: 'Okay' }]
        );
    };

    const updateMapRegion = (location: Location) => {
        setMapRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: MAP_DELTA.latitudeDelta,
            longitudeDelta: MAP_DELTA.longitudeDelta
        });
    };

    const onSelectLocation = async (event: MapEvent) => {
        if (!readonly && !isGetMyLocationInProgress) {
            const latitude: number = event.nativeEvent.coordinate.latitude;
            const longitude: number = event.nativeEvent.coordinate.longitude;
            const address: string = await findAddress(latitude, longitude);
            const selectedLocation: Location = {
                latitude: latitude,
                longitude: longitude,
                address: address
            };
            setLocation(selectedLocation);
            setMapRegion(undefined);
        }
    };

    const findAddress = async (latitude: number, longitude: number): Promise<string> => {
        setAddressSearchInProgress(true);

        let result: string = '';
        try {
            const geocodeResponse: GoogleGeocodeResponse = await GoogleService.geocode(latitude, longitude);
            result = geocodeResponse.results[0].formatted_address;
        } catch (error) {
            result = 'Address is not found.';
        }

        setAddressSearchInProgress(false);
        return result;
    };

    return (
        <View style={ styles.screen }>
            {
                !readonly && (
                    <View style={ styles.actionContainer }>
                        {
                            isGetMyLocationInProgress
                                ? <ActivityIndicator size="large" color={ COLORS.primary }/>
                                : <Button title="Get My Location" onPress={ getMyLocation } color={ COLORS.primary }/>
                        }
                    </View>
                )
            }
            <MapView style={ styles.map } region={ mapRegion } onPress={ onSelectLocation }>
                {
                    location && <Marker title={ location.address } coordinate={ location }/>
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
    actionContainer: {
        position: 'absolute',
        top: 10
    },
    map: {
        width: '100%',
        height: '100%',
        zIndex: -1
    }
});

export const mapScreenNavigationOptions = (props: MapScreenProps) => {
    return {
        headerTitle: ''
    } as StackNavigationOptions;
};

export default MapScreen;
