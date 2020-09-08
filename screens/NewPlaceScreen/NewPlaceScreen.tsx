import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/src/types';

const NewPlaceScreen = () => {
    return (
        <View style={ styles.screen }>
            <Text>NewPlaceScreen</Text>
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

NewPlaceScreen.navigationOptions = (props: NavigationStackScreenProps) => {
    return {
        headerTitle: 'New Place'
    } as NavigationStackOptions;
};

export default NewPlaceScreen;
