import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { COLORS } from '../constants/colors';
import { Nullable } from '../models/Nullable';
import CameraScreen, { cameraScreenNavigationOptions } from '../screens/CameraScreen/CameraScreen';
import MapScreen, { mapScreenNavigationOptions } from '../screens/MapScreen/MapScreen';
import NewPlaceScreen, { newPlaceScreenNavigationOptions } from '../screens/NewPlaceScreen/NewPlaceScreen';
import PlaceDetailsScreen, { placeDetailsScreenNavigationOptions } from '../screens/PlaceDetailsScreen/PlaceDetailsScreen';
import PlacesListScreen, { placesListScreenNavigationOptions } from '../screens/PlacesListScreen/PlacesListScreen';
import { Place } from '../models/Place';
import { Location } from '../models/Location';
import * as NavigationService from '../services/navigation.service';

const defaultNavOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: COLORS.primary
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center'
};

export type PlacesNavigatorParams = {
    PlacesList: undefined,
    Camera: { navigateTo?: 'Map' | 'NewPlace' } | undefined,
    PlaceDetails: { place: Place },
    NewPlace: undefined,
    Map: { readonly?: boolean, initialLocation: Nullable<Location> } | undefined
};
const PlacesStackNavigator = createStackNavigator<PlacesNavigatorParams>();
const PlacesNavigator = () => {
    return (
        <PlacesStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <PlacesStackNavigator.Screen
                name="PlacesList"
                component={ PlacesListScreen }
                options={ placesListScreenNavigationOptions }
            />
            <PlacesStackNavigator.Screen
                name="Camera"
                component={ CameraScreen }
                options={ cameraScreenNavigationOptions }
            />
            <PlacesStackNavigator.Screen
                name="Map"
                component={ MapScreen }
                options={ mapScreenNavigationOptions }
            />
            <PlacesStackNavigator.Screen
                name="NewPlace"
                component={ NewPlaceScreen }
                options={ newPlaceScreenNavigationOptions }
            />
            <PlacesStackNavigator.Screen
                name="PlaceDetails"
                component={ PlaceDetailsScreen }
                options={ placeDetailsScreenNavigationOptions }
            />
        </PlacesStackNavigator.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer ref={ ref => NavigationService.init(ref) }>
            <PlacesNavigator/>
        </NavigationContainer>
    );
};

export default AppNavigator;
