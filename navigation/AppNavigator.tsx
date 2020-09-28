import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { COLORS } from '../constants/colors';
import CameraScreen, { cameraScreenNavigationOptions } from '../screens/CameraScreen/CameraScreen';
import PickLocationScreen, { pickLocationScreenNavigationOptions } from '../screens/PickLocation/PickLocationScreen';
import NewPlaceScreen, { newPlaceScreenNavigationOptions } from '../screens/NewPlaceScreen/NewPlaceScreen';
import PlaceDetailsScreen, { placeDetailsScreenNavigationOptions } from '../screens/PlaceDetailsScreen/PlaceDetailsScreen';
import PlacesListScreen, { placesListScreenNavigationOptions } from '../screens/PlacesListScreen/PlacesListScreen';
import { Place } from '../models/Place';
import { Location } from '../models/Location';
import * as NavigationService from '../services/navigation.service';
import PlacesMapScreen, { placesMapScreenNavigationOptions } from '../screens/PlacesMapScreen/PlacesMapScreen';
import { PlacesNavigatePath } from './navigation.utils';
import { Nullable } from '../models/Nullable';
import PhotoModal, { photoModalNavigationOptions } from '../screens/PhotoModal/PhotoModal';

const defaultNavOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: COLORS.primary
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center'
};

export type PlacesNavigatorParams = {
    PlacesList: undefined,
    PlacesMap: { place: Nullable<Place> } | undefined,
    Camera: { navigateTo: Nullable<PlacesNavigatePath> } | undefined,
    PlaceDetails: { place: Place },
    NewPlace: undefined,
    PickLocation: { initialLocation: Nullable<Location> } | undefined,
    PhotoModal: { uri: string }
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
                name="PlacesMap"
                component={ PlacesMapScreen }
                options={ placesMapScreenNavigationOptions }
            />
            <PlacesStackNavigator.Screen
                name="Camera"
                component={ CameraScreen }
                options={ cameraScreenNavigationOptions }
            />
            <PlacesStackNavigator.Screen
                name="PickLocation"
                component={ PickLocationScreen }
                options={ pickLocationScreenNavigationOptions }
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

export type RootNavigatorParams = {
    Places: undefined,
    PhotoModal: { uri: string }
};
const RootStackNavigator = createStackNavigator<RootNavigatorParams>();
const RootNavigator = () => {
    return (
        <RootStackNavigator.Navigator mode="modal" headerMode="none">
            <RootStackNavigator.Screen
                name="Places"
                component={ PlacesNavigator }
            />
            <RootStackNavigator.Screen
                name="PhotoModal"
                component={ PhotoModal }
                options={ photoModalNavigationOptions }
            />
        </RootStackNavigator.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer ref={ ref => NavigationService.init(ref) }>
            <RootNavigator/>
        </NavigationContainer>
    );
};

export default AppNavigator;
