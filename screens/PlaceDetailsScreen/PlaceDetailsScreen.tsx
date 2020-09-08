import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailsScreen = () => {
    return (
        <View style={ styles.screen }>
            <Text>PlaceDetailsScreen</Text>
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

export default PlaceDetailsScreen;
