import React from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';

type PlacesListScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'PlacesList'>;
type PlacesListScreenRouteProp = RouteProp<PlacesNavigatorParams, 'PlacesList'>;
type PlacesListScreenProps = {
    navigation: PlacesListScreenStackNavigationProp,
    route: PlacesListScreenRouteProp
};

const PlacesListScreen = (props: PlacesListScreenProps) => {
    return (
        <View style={ styles.screen }>
            <Text>PlacesListScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
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
