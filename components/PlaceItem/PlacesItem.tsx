import React from 'react';
import { Place } from '../../models/Place';
import {
    View,
    StyleSheet,
    TouchableNativeFeedback,
    Image,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import DefaultText from '../UI/DefaultText/DefaultText';

interface PlacesItemProps {
    place: Place,
    onSelect: (place: Place) => void,
    onRemove: (place: Place) => void,
    removeInProgress?: boolean
}

const PlacesItem = (props: PlacesItemProps) => {

    let removeButton: React.ReactElement;
    if (props.removeInProgress) {
        removeButton = (
            <View style={ styles.deleteIconContainer }>
                <ActivityIndicator size="small" color={ COLORS.primary }/>
            </View>
        );
    } else {
        removeButton = (
            <TouchableNativeFeedback onPress={ () => props.onRemove(props.place) }>
                <View style={ styles.deleteIconContainer }>
                    <Ionicons name="ios-trash" size={ 23 } color={ COLORS.danger }/>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <View style={ styles.placeItem }>
            <TouchableNativeFeedback onPress={ () => props.onSelect(props.place) }>
                <View style={ styles.detailsContainer }>
                    <View style={ styles.imageContainer }>
                        <Image style={ styles.image } source={{ uri: props.place.imageUri }}/>
                    </View>
                    <View style={ styles.details }>
                        <DefaultText style={ styles.name }>{ props.place.name }</DefaultText>
                        <DefaultText style={ styles.address }
                                     numberOfLines={ 2 }
                                     ellipsizeMode="tail">
                            { props.place.location.address }
                        </DefaultText>
                    </View>
                </View>
            </TouchableNativeFeedback>
            { removeButton }
        </View>
    );
};

const styles = StyleSheet.create({
    placeItem: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.common,
        borderBottomWidth: 1
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        padding: 15
    },
    imageContainer: {
        width: '20%',
        minWidth: 70
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
        width: '80%',
        paddingHorizontal: 15
    },
    name: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginBottom: 5,
        marginRight: 10
    },
    address: {
        fontSize: 16
    },
    deleteIconContainer: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PlacesItem;
