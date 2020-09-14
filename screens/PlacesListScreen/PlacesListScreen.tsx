import React, { useEffect } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { Action, Dispatch } from 'redux';
import { RouteProp } from '@react-navigation/native';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { Place } from '../../models/Place';
import { RootState } from '../../store/store';
import PlacesItem from '../../components/PlaceItem/PlacesItem';
import { StorageState } from '../../store/places/places.reducer';
import ScreenLoader from '../../components/UI/ScreenLoader/ScreenLoader';
import Error from '../../components/UI/Error/Error';
import { COLORS } from '../../constants/colors';
import * as PlacesActions from '../../store/places/places.actions';

type PlacesListScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PlacesList'>;
type PlacesListScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PlacesList'>;
type PlacesListScreenProps = {
    navigation: PlacesListScreenStackNavigationProp,
    route: PlacesListScreenRouteProp
};

const PlacesListScreen = (props: PlacesListScreenProps) => {

    const places: Place[] = useSelector(
        (state: RootState) => state.placesState.places
    );
    const fetchPlacesState: StorageState = useSelector(
        (state: RootState) => state.placesState.fetchPlacesState
    );
    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        dispatch(PlacesActions.fetchPlaces());
        return props.navigation
            .addListener(
                'focus',
                () => dispatch(PlacesActions.fetchPlaces())
            );
    }, [dispatch]);

    const onRefresh = () => {
        dispatch(PlacesActions.fetchPlaces());
    };

    const onAddNewPlace = () => {
        props.navigation.navigate('Map');
    };

    const onPlaceSelect = (place: Place) => {
        props.navigation.navigate('PlaceDetails', { place: place });
    };

    const renderPlace = (itemInfo: ListRenderItemInfo<Place>) => {
        return <PlacesItem place={ itemInfo.item } onSelect={ onPlaceSelect }/>;
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ fetchPlacesState.inProgress }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }/>
    );

    if (fetchPlacesState.inProgress) {
        return <ScreenLoader/>
    } else if (fetchPlacesState.error) {
        return <Error message="Error while fetching places." onReload={ onRefresh }/>
    } else if (!places || places.length === 0) {
        return <Error message="No places found."
                      onReload={ onRefresh }
                      button={{ title: 'Add new place', action: onAddNewPlace }}/>;
    } else {
        return <FlatList data={ places }
                         keyExtractor={ (place: Place) => place.id.toString() }
                         renderItem={ renderPlace }
                         refreshControl={ refreshControl }/>;
    }
};

export const placesListScreenNavigationOptions = (props: PlacesListScreenProps) => {
    return {
        headerTitle: 'All Places',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Add Place'
                          iconName='ios-add'
                          onPress={ () => props.navigation.navigate('Map') }
                    />
                </HeaderButtons>
            );
        }
    } as StackNavigationOptions;
};

export default PlacesListScreen;
