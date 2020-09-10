import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { useSelector } from 'react-redux';
import { Place } from '../../models/Place';
import { RootState } from '../../store/store';
import PlacesItem from '../../components/PlaceItem/PlacesItem';

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

    const onPlaceSelect = (place: Place) => {
        props.navigation.navigate('PlaceDetails', { place: place });
    }

    const renderPlace = (itemInfo: ListRenderItemInfo<Place>) => {
        return <PlacesItem place={ itemInfo.item } onSelect={ onPlaceSelect }/>;
    };

    return (
        <FlatList data={ places } renderItem={ renderPlace }/>
    );
};

const styles = StyleSheet.create({

});

export const placesListScreenNavigationOptions = (props: PlacesListScreenProps) => {
    return {
        headerTitle: 'All Places',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Add Place'
                          iconName='ios-add'
                          onPress={ () => props.navigation.navigate('NewPlace') }
                    />
                </HeaderButtons>
            );
        }
    } as StackNavigationOptions;
};

export default PlacesListScreen;
