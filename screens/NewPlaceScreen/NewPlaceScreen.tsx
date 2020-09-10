import React, { useState } from 'react';
import { Action, Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Keyboard } from 'react-native';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { COLORS } from '../../constants/colors';
import * as PlacesActions from '../../store/places/places.actions';

type NewPlaceScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenRouteProp = RouteProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenProps = {
    navigation: NewPlaceScreenStackNavigationProp,
    route: NewPlaceScreenRouteProp
};

const NewPlaceScreen = (props: NewPlaceScreenProps) => {

    const [title, setTitle] = useState('');
    const dispatch: Dispatch<Action> = useDispatch();

    const onInputValueChange = (text: string) => {
        setTitle(text);
    };

    const onSave = () => {
        Keyboard.dismiss();
        dispatch(PlacesActions.addPlace(
            {
                id: new Date().toString(),
                title: title,
                image: '',
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
    }
});

export const newPlaceScreenNavigationOptions = (props: NewPlaceScreenProps) => {
    return {
        headerTitle: 'New Place'
    } as StackNavigationOptions;
};

export default NewPlaceScreen;
