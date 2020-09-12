import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Button, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import * as ExpoLocation from 'expo-location';
import * as ExpoPermissions from 'expo-permissions';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import { LocationData } from 'expo-location/src/Location';
import { Location } from '../../models/Location';
import MapPreview from './MapPreview/MapPreview';

interface LocationPickerProps {

}

const LocationPicker = (props: LocationPickerProps) => {

    const [location, setLocation] = useState<Location>();
    const [showLoader, setShowLoader] = useState(false);

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
    }

        return (
        <View style={ styles.locationPicker }>
            <View style={ styles.mapPreviewContainer }>
                <MapPreview location={ location } showLoader={ showLoader }/>
            </View>
            <Button title="Get My Location" onPress={ onGetMyLocation } color={ COLORS.primary }/>
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
    }
});

export default LocationPicker;