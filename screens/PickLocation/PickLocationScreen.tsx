import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Alert, Button, StyleSheet, View } from 'react-native';
import MapView, { MapEvent, Region, Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { COLORS } from '../../constants/colors';
import { MAP_DELTA } from '../../constants/map';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';
import * as PickLocationActions from '../../store/pick-location/pick-location.actions';
import { RootState } from '../../store/store';
import { useProgressionStateObserver } from '../../hooks/transaction-state-observer.hook';
import { ProgressionState } from '../../models/ProgressionState';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';
import { Location } from '../../models/Location';
import { Nullable } from '../../models/Nullable';

type PickLocationScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PickLocation'>;
type PickLocationScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PickLocation'>;
type PickLocationScreenProps = {
    navigation: PickLocationScreenStackNavigationProp,
    route: PickLocationScreenRouteProp
};

const PickLocationScreen = (props: PickLocationScreenProps) => {

    const initialLocation: Nullable<Location> = props.route.params?.initialLocation;

    const [mapRegion, setLocationRegion] = useState<Region>();

    const pickedLocation = useSelector(
        (state: RootState) => state.pickLocationState.location
    );
    const savedLocation = useSelector(
        (state: RootState) => state.newPlaceState.location
    );
    const selectLocationState: ProgressionState = useSelector(
        (state: RootState) => state.pickLocationState.selectLocationState
    );
    const getMyLocationState: ProgressionState = useSelector(
        (state: RootState) => state.pickLocationState.getMyLocationState
    );

    const dispatch: Dispatch<Action> = useDispatch();

    const updateMapRegion = useCallback(() => {
        if (pickedLocation) {
            setLocationRegion({
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,
                latitudeDelta: MAP_DELTA.latitudeDelta,
                longitudeDelta: MAP_DELTA.longitudeDelta
            });
        }
    }, [pickedLocation]);

    const initLocation = useCallback(() => {
        if (initialLocation) {
            dispatch(PickLocationActions.setLocation(initialLocation));
        } if (savedLocation) {
            dispatch(PickLocationActions.setLocation(savedLocation));
        } else {
            dispatch(PickLocationActions.getMyLocation());
        }
    }, [initialLocation, savedLocation]);

    useProgressionStateObserver(
        getMyLocationState,
        undefined,
        updateMapRegion,
        (error: string) => {
            Alert.alert(
                'Could not fetch location.',
                'Please try again later or pick location on map.',
                [{ text: 'Okay' }]
            );
        }
    );

    useEffect(() => {
        const unsubscribeFocus = props.navigation.addListener('focus', initLocation);
        const unsubscribeBeforeRemove = props.navigation.addListener('beforeRemove', () => {
            dispatch(PickLocationActions.stopPickLocation());
            dispatch(PickLocationActions.clearLocation());
        });

        return () => {
            unsubscribeFocus();
            unsubscribeBeforeRemove();
        }
    }, [initLocation]);

    useEffect(() => {
        if (pickedLocation) {
            props.navigation.setOptions({
                headerTitle: pickedLocation.address,
                headerRight: () => {
                    return (
                        <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                            <Item title='Save location'
                                  iconName='ios-save'
                                  onPress={ () => {
                                      dispatch(NewPlaceActions.setLocation(pickedLocation));
                                      props.navigation.navigate(PlacesNavigatePath.NEW_PLACE);
                                  } }
                            />
                        </HeaderButtons>
                    );
                }
            });
        }
    }, [pickedLocation]);

    useEffect(() => {
        if (pickedLocation) {
            if (!mapRegion?.latitudeDelta
                || !mapRegion?.longitudeDelta
                || mapRegion.latitudeDelta > MAP_DELTA.latitudeDelta
                || mapRegion.longitudeDelta > MAP_DELTA.latitudeDelta)
            {
                updateMapRegion();
            }
        }
    }, [updateMapRegion])

    useEffect(() => {
        if (selectLocationState.inProgress) {
            props.navigation.setOptions({
                headerTitle: 'Loading...'
            });
        }
    }, [selectLocationState]);

    const onSelectLocation = async (event: MapEvent) => {
        if (!getMyLocationState.inProgress) {
            const latitude: number = event.nativeEvent.coordinate.latitude;
            const longitude: number = event.nativeEvent.coordinate.longitude;
            dispatch(PickLocationActions.selectLocation(latitude, longitude));
        }
    };

    return (
        <View style={ styles.screen }>
            <View style={ styles.actionContainer }>
                {
                    getMyLocationState.inProgress
                        ? <ActivityIndicator size="large"
                                             color={ COLORS.primary }/>
                        : <Button title="Get My Location"
                                  onPress={ () => dispatch(PickLocationActions.getMyLocation()) }
                                  color={ COLORS.primary }/>
                }
            </View>
            <MapView style={ styles.map }
                     region={ mapRegion }
                     onRegionChangeComplete={ setLocationRegion }
                     onPress={ onSelectLocation }>
                {
                    pickedLocation && <Marker title={ pickedLocation.address } coordinate={ pickedLocation }/>
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

export const pickLocationScreenNavigationOptions = (props: PickLocationScreenProps) => {
    return {
        headerTitle: ''
    } as StackNavigationOptions;
};

export default PickLocationScreen;
