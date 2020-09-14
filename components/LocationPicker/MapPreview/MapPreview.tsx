import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Location } from '../../../models/Location';
import { ENV } from '../../../env';
import { COLORS } from '../../../constants/colors';

interface MapPreviewProps {
    location?: Location,
    showLoader?: boolean,
    onPress?: () => void
}

const MapPreview = (props: MapPreviewProps) => {

    const mapPreviewUrl: string = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location?.latitude},${props.location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location?.latitude},${props.location?.longitude}&key=${ENV.googleApiKey}`;

    return (
        <TouchableNativeFeedback onPress={ () => props.onPress && props.onPress() }>
            <View style={ styles.mapPreview }>
                {
                    props.showLoader
                        ? <ActivityIndicator size="large" color={ COLORS.primary }/>
                        : props.location
                        ? <Image style={ styles.image } source={{ uri: mapPreviewUrl }}/>
                        : <Text>No location chosen yet.</Text >
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
        height: 200,
        borderColor: COLORS.common,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;
