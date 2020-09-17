import React from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Location } from '../../models/Location';
import { ENV } from '../../env';
import { COLORS } from '../../constants/colors';
import { Nullable } from '../../models/Nullable';
import DefaultText from '../UI/DefaultText/DefaultText';

interface MapPreviewProps {
    location: Nullable<Location>,
    onPress?: () => void
}

const MapPreview = (props: MapPreviewProps) => {

    const mapPreviewUrl: string = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location?.latitude},${props.location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location?.latitude},${props.location?.longitude}&key=${ENV.googleApiKey}`;

    return (
        <TouchableNativeFeedback style={ styles.mapPreview } onPress={ () => props.onPress && props.onPress() } useForeground>
            <View style={ styles.mapPreview }>
                {
                    props.location
                        ? (
                            <>
                                <View style={ styles.addressContainer }>
                                    <DefaultText style={ styles.address }>{ props.location.address }</DefaultText>
                                </View>
                                <View style={ styles.imageContainer }>
                                    <Image style={ styles.image } source={{ uri: mapPreviewUrl }}/>
                                </View>
                            </>
                        )
                        : <DefaultText>No location chosen yet.</DefaultText>
                }
            </View>
        </TouchableNativeFeedback>
    )
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    addressContainer: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white',
        paddingHorizontal: 5
    },
    address: {
        color: COLORS.primary,
        textAlign: 'center'
    },
    imageContainer: {
        width: '100%',
        height: '80%'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;
