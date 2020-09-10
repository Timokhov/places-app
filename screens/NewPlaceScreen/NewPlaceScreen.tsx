import React, { useState } from 'react';
import { Action, Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Keyboard } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { COLORS } from '../../constants/colors';
import * as PlacesActions from '../../store/places/places.actions';
import ImagePicker from '../../components/ImagePicker/ImagePicker';

type NewPlaceScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenRouteProp = RouteProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenProps = {
    navigation: NewPlaceScreenStackNavigationProp,
    route: NewPlaceScreenRouteProp
};

const NewPlaceScreen = (props: NewPlaceScreenProps) => {

    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState('');
    const dispatch: Dispatch<Action> = useDispatch();

    const onInputValueChange = (text: string) => {
        setTitle(text);
    };

    const onImageTaken = (imageUri: string) => {
        setImageUri(imageUri);
    }

    const onSave = () => {
        Keyboard.dismiss();
        dispatch(PlacesActions.addPlace(
            {
                id: new Date().toString(),
                title: title,
                imageUri: imageUri,
                address: ''
            }
        ));
        props.navigation.goBack();
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={ styles.form }>
                <Text style={ styles.title }>Title</Text>
                <TextInput style={ styles.textInput }
                           value={ title }
                           onChangeText={ onInputValueChange }
                />
                <View style={ styles.imagePickerContainer }>
                    <ImagePicker onImageTaken={ onImageTaken }/>
                </View>
                <Button title="Save" onPress={ onSave } color={ COLORS.primary }/>
            </View>
        </ScrollView>
    );
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
    imagePickerContainer: {
        margin: 15
    }
});

export const newPlaceScreenNavigationOptions = (props: NewPlaceScreenProps) => {
    return {
        headerTitle: 'New Place'
    } as StackNavigationOptions;
};

export default NewPlaceScreen;
