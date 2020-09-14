import React, { useEffect, useState } from 'react';
import { Action, Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Keyboard, Alert } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { COLORS } from '../../constants/colors';
import * as PlacesActions from '../../store/places/places.actions';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import { RootState } from '../../store/store';
import ScreenLoader from '../../components/UI/ScreenLoader/ScreenLoader';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import { Location } from '../../models/Location';

type NewPlaceScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenRouteProp = RouteProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenProps = {
    navigation: NewPlaceScreenStackNavigationProp,
    route: NewPlaceScreenRouteProp
};

const NewPlaceScreen = (props: NewPlaceScreenProps) => {

    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [location, setLocation] = useState<Location>();
    const dispatch: Dispatch<Action> = useDispatch();
    const addPlaceInProgress: boolean = useSelector(
        (state: RootState) => state.placesState.addPlaceState.inProgress
    );
    const addPlaceError: string = useSelector(
        (state: RootState) => state.placesState.addPlaceState.error
    );

    useEffect(() => {
        if (addPlaceError) {
            Alert.alert('Error!', addPlaceError, [{ text: 'Okay' }]);
        }
    }, [addPlaceError]);

    const onInputValueChange = (text: string) => {
        setTitle(text);
    };

    const onImageTaken = (imageUri: string) => {
        setImageUri(imageUri);
    };

    const onLocationSelected = (location: Location) => {
        setLocation(location);
    };

    const onSave = () => {
        if (location) {
            Keyboard.dismiss();
            dispatch(PlacesActions.addPlace(
                {
                    id: 0,
                    title: title,
                    imageUri: imageUri,
                    address: 'Address',
                    location: location
                }
            ));
            props.navigation.navigate('PlacesList');
        }
    };

    if (addPlaceInProgress) {
        return <ScreenLoader/>
    } else {
        return (
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={ styles.form }>
                    <Text style={ styles.title }>Title</Text>
                    <TextInput style={ styles.textInput }
                               value={ title }
                               onChangeText={ onInputValueChange }
                    />
                    <View style={ styles.detailContainer }>
                        <ImagePicker onImageTaken={ onImageTaken }/>
                    </View>
                    <View style={ styles.detailContainer }>
                        <LocationPicker onLocationSelected={ onLocationSelected } locationFromMap={ props.route.params?.locationFromMap }/>
                    </View>
                    <Button title="Save" onPress={ onSave } color={ COLORS.primary }/>
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    title: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: COLORS.common,
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    detailContainer: {
        margin: 15
    }
});

export const newPlaceScreenNavigationOptions = (props: NewPlaceScreenProps) => {
    return {
        headerTitle: 'New Place'
    } as StackNavigationOptions;
};

export default NewPlaceScreen;
