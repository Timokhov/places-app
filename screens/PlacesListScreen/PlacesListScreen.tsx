import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/src/types';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';

const PlacesListScreen = () => {
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

PlacesListScreen.navigationOptions = (props: NavigationStackScreenProps) => {
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
    } as NavigationStackOptions;
};

export default PlacesListScreen;
