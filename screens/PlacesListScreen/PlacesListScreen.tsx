import React, { useCallback, useEffect } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { Action, Dispatch } from 'redux';
import { RouteProp } from '@react-navigation/native';
import { Alert, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { ProgressionState } from '../../models/ProgressionState';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { Place } from '../../models/Place';
import { RootState } from '../../store/store';
import PlacesItem from '../../components/PlaceItem/PlacesItem';
import ScreenLoader from '../../components/UI/ScreenLoader/ScreenLoader';
import Error from '../../components/UI/Error/Error';
import { COLORS } from '../../constants/colors';
import * as PlacesActions from '../../store/places/places.actions';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';

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
    const fetchPlacesState: ProgressionState = useSelector(
        (state: RootState) => state.placesState.fetchPlacesState
    );
    const deletePlaceStatesMap: { [index: number]: ProgressionState } = useSelector(
        (state: RootState) => state.placesState.deletePlaceStatesMap
    );

    const dispatch: Dispatch<Action> = useDispatch();
    const dispatchFetchPlaces = useCallback(() => {
        dispatch(PlacesActions.fetchPlaces());
    }, [dispatch]);
    const dispatchCreateNewPlace = useCallback(() => {
        dispatch(NewPlaceActions.createNewPlaceStart());
        props.navigation.navigate(PlacesNavigatePath.CAMERA)
    }, [dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                        <Item title='Add Place'
                              iconName='ios-add'
                              onPress={ dispatchCreateNewPlace }/>
                    </HeaderButtons>
                );
            }
        });

        dispatchFetchPlaces();
        return props.navigation.addListener('focus', dispatchFetchPlaces);
    }, [dispatchFetchPlaces, dispatchCreateNewPlace]);

    const onRefresh = () => {
        dispatchFetchPlaces();
    };

    const onPlaceSelect = (place: Place) => {
        props.navigation.navigate(PlacesNavigatePath.PLACE_DETAILS, { place: place });
    };

    const onPlaceRemove = (place: Place) => {
        Alert.alert(
            'Are you sure?',
            `Do you really want to delete place with name '${place.name}'?`,
            [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive', onPress: () => dispatch(PlacesActions.deletePlace(place)) }
            ]
        );
    };

    const renderPlace = (itemInfo: ListRenderItemInfo<Place>) => {
        const deletePlaceState: ProgressionState = deletePlaceStatesMap[itemInfo.item.id];
        return <PlacesItem place={ itemInfo.item }
                           onSelect={ onPlaceSelect }
                           onRemove={ onPlaceRemove }
                           removeInProgress={ deletePlaceState && deletePlaceState.inProgress }/>;
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ fetchPlacesState.inProgress }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }/>
    );

    if (fetchPlacesState.inProgress) {
        return <ScreenLoader/>
    } else if (fetchPlacesState.error) {
        return <Error message="Error while fetching places."
                      onReload={ onRefresh }/>
    } else if (!places || places.length === 0) {
        return <Error message="No places found."
                      onReload={ onRefresh }
                      button={{ title: 'Add new place', action: dispatchCreateNewPlace }}/>;
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
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Places Map'
                          iconName='ios-map'
                          onPress={ () => props.navigation.navigate(PlacesNavigatePath.PLACES_MAP) }/>
                </HeaderButtons>
            );
        }
    } as StackNavigationOptions;
};

export default PlacesListScreen;
