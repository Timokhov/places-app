import React from 'react';
import { Place } from '../../models/Place';
import { Image, View, StyleSheet } from 'react-native';
import { Marker } from "react-native-maps";
import { COLORS } from '../../constants/colors';

interface PlaceMarkerProps {
    place: Place,
    onPress?: (place: Place) => void
}

const PlaceMarker = (props: PlaceMarkerProps) => {
    return (
        <Marker key={ props.place.id }
                style={ styles.placeMarker }
                coordinate={ props.place.location }
                onPress={ () => props.onPress && props.onPress(props.place) }>
            <View style={ styles.imageContainer }>
                <View style={ styles.drop }>
                    <Image style={ styles.image } source={{ uri: props.place.imageUri }}/>
                </View>
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    placeMarker: {
        width: 40,
        height: 60,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    drop: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: COLORS.primary,
        transform: [{ rotateZ: '45deg' }]
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        transform: [{ rotateZ: '-45deg' }]
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
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.primary,
        alignSelf: 'center'
    }
});

export default PlaceMarker;
