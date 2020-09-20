import React from 'react';
import { Place } from '../../models/Place';
import { Image, View, StyleSheet } from 'react-native';
import DefaultText from '../UI/DefaultText/DefaultText';
import { Marker } from "react-native-maps";
import { COLORS } from '../../constants/colors';

interface PlaceMarkerProps {
    place: Place,
    onPress?: (place: Place) => void
}

const PlaceMarker = (props: PlaceMarkerProps) => {
    return (
        <Marker key={ props.place.id }
                coordinate={ props.place.location }
                onPress={ () => props.onPress && props.onPress(props.place) }>
            <View style={ styles.imageContainer }>
                <Image style={ styles.image } source={{ uri: props.place.imageUri }}/>
                <View style={ styles.nameContainer }>
                    <DefaultText style={ styles.name }
                                 numberOfLines={ 2 }
                                 ellipsizeMode="tail">
                        { props.place.name }
                    </DefaultText>
                </View>
            </View>
            <View style={ styles.picker }/>
        </Marker>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        width: 80,
        height: 30,
        borderRadius: 8,
        backgroundColor: COLORS.second,
        overflow: 'hidden'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 8
    },
    nameContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3
    },
    name: {
        fontFamily: 'open-sans-bold',
        fontSize: 9,
        color: 'white'
    },
    picker: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.second,
        alignSelf: 'center'
    }
});

export default PlaceMarker;