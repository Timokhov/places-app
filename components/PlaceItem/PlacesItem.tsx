import React from 'react';
import { Place } from '../../models/Place';
import { View, StyleSheet, TouchableNativeFeedback, Image, Text } from 'react-native';
import { COLORS } from '../../constants/colors';

interface PlacesItemProps {
    place: Place,
    onSelect: (place: Place) => void
}

const PlacesItem = (props: PlacesItemProps) => {
    return (
        <TouchableNativeFeedback onPress={ () => props.onSelect(props.place) }>
            <View style={ styles.placeItem }>
                <Image style={ styles.image } source={{ uri: props.place.imageUri }}/>
                <View style={ styles.details }>
                    <Text style={ styles.title }>{ props.place.title }</Text>
                    <Text style={ styles.address }>{ props.place.address }</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    placeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.common,
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: COLORS.primary
    },
    details: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 25,
        width: 250
    },
    title: {
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        fontSize: 16,
        color: COLORS.text
    }
});

export default PlacesItem;