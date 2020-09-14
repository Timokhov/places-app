import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import * as ExpoLocation from 'expo-location';
import * as ExpoPermissions from 'expo-permissions';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { LocationData } from 'expo-location/src/Location';
import { Location } from '../../models/Location';
import MapPreview from './MapPreview/MapPreview';

interface LocationPickerProps {
    onLocationSelected: (location: Location) => void,
    locationFromMap?: Location
}

const LocationPicker = (props: LocationPickerProps) => {

    const [location, setLocation] = useState<Location>();
    const [showLoader, setShowLoader] = useState(false);

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    useEffect(() => {
        setLocation(props.locationFromMap);
    }, [props.locationFromMap]);

    useEffect(() => {
        if (location) {
            props.onLocationSelected(location);
        }
    }, [location]);

    const verifyLocationPermissions = async () => {
        const result: PermissionResponse = await ExpoPermissions.askAsync(ExpoPermissions.LOCATION);
        if (result.status !== PermissionStatus.GRANTED) {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permission to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }

        return true;
    };

    const onGetMyLocation = async () => {
        setShowLoader(true);
        const hasLocationPermission: boolean = await verifyLocationPermissions();
        if (hasLocationPermission) {
            try {
                const result: LocationData = await ExpoLocation.getCurrentPositionAsync({ timeout: 5000 });
                setLocation({
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude
                });
            } catch (error) {
                Alert.alert(
                    'Could not fetch location.',
                    'Please try again later or pick a location on the map.',
                    [{ text: 'Okay' }]
                );
            }
        }
        setShowLoader(false);
    };

    const onPickOnMap = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={ styles.locationPicker }>
            <View style={ styles.mapPreviewContainer }>
                <MapPreview location={ location } showLoader={ showLoader } onPress={ onPickOnMap }/>
            </View>
            <View style={ styles.actions }>
                <Button title="Get My Location" onPress={ onGetMyLocation } color={ COLORS.primary }/>
                <Button title="Pick on Map" onPress={ onPickOnMap } color={ COLORS.primary }/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        alignItems: 'center'
    },
    mapPreviewContainer: {
        marginBottom: 20,
        width: '100%'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;
