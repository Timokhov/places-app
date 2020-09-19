import React, { useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Alert,
    TouchableNativeFeedback, Keyboard
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import MapPreview from '../../components/MapPreview/MapPreview';
import InputControl from '../../components/UI/InputControl/InputControl';
import ScreenLoader from '../../components/UI/ScreenLoader/ScreenLoader';
import { COLORS } from '../../constants/colors';
import { useTransactionStateObserver } from '../../hooks/transaction-state-observer.hook';
import { Nullable } from '../../models/Nullable';
import { TransactionState } from '../../models/TransactionState';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { Location } from '../../models/Location';
import { RootState } from '../../store/store';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';

type NewPlaceScreenStackNavigationProp = StackNavigationProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenRouteProp = RouteProp<PlacesNavigatorParams, 'NewPlace'>;
type NewPlaceScreenProps = {
    navigation: NewPlaceScreenStackNavigationProp,
    route: NewPlaceScreenRouteProp
};

const NewPlaceScreen = (props: NewPlaceScreenProps) => {

    const imageUri: string = useSelector(
        (state: RootState) => state.newPlaceState.imageUri
    );
    const location: Nullable<Location> = useSelector(
        (state: RootState) => state.newPlaceState.location
    );
    const name: string = useSelector(
        (state: RootState) => state.newPlaceState.name
    );
    const description: string = useSelector(
        (state: RootState) => state.newPlaceState.description
    );
    const addPlaceState: TransactionState = useSelector(
        (state: RootState) => state.newPlaceState.addPlaceState
    );

    const [showLoader, setShowLoader] = useState(false);

    const dispatch: Dispatch<Action> = useDispatch();

    useTransactionStateObserver(
        addPlaceState,
        () => setShowLoader(true),
        () => setShowLoader(false),
        (error: string) => {
            setShowLoader(false);
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    );

    const onChangeImage = () => {
        Keyboard.dismiss();
        props.navigation.push('Camera', { navigateTo: 'NewPlace' });
    };

    const onChangeLocation = () => {
        Keyboard.dismiss();
        props.navigation.push('Map', { readonly: false, initialLocation: location });
    };

    const onSave = () => {
        Keyboard.dismiss();
        if (imageUri && location && name && description) {
            dispatch(NewPlaceActions.addPlace(imageUri, location, name, description));
        }
    };

    if (showLoader) {
        return <ScreenLoader/>
    } else {
        return (
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={ styles.screen } keyboardShouldPersistTaps="handled">
                    {
                        !!imageUri && (
                            <TouchableNativeFeedback onPress={ onChangeImage } useForeground>
                                <View style={ styles.imageContainer }>
                                    <Image style={ styles.image } source={{ uri: imageUri }}/>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    }
                    <View style={ styles.locationContainer }>
                        <MapPreview location={ location } onPress={ onChangeLocation }/>
                    </View>
                    <View style={ styles.descriptionContainer }>
                        <InputControl label="Name"
                                      value={ name }
                                      onValueChange={
                                          (newValue: string) => dispatch(NewPlaceActions.setName(newValue))
                                      }
                                      keyboardType="default"
                                      autoCapitalize="sentences"
                                      autoCorrect
                                      returnKeyType="next"/>
                        <InputControl label="Description"
                                      value={ description }
                                      onValueChange={
                                          (newValue: string) => dispatch(NewPlaceActions.setDescription(newValue))
                                      }
                                      keyboardType="default"
                                      autoCapitalize="sentences"
                                      autoCorrect
                                      returnKeyType="next"/>
                    </View>
                    <Button title="Save Place"
                            onPress={ onSave }
                            color={ COLORS.primary }
                            disabled={ !description || !name }/>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 10
    },
    imageContainer: {
        height: 200,
        width: '100%',
        backgroundColor: COLORS.common,
        marginBottom: 10
    },
    image: {
        flex: 1
    },
    locationContainer: {
        marginVertical: 10,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionContainer: {
        width: '90%',
        marginVertical: 10
    }
});

export const newPlaceScreenNavigationOptions = (props: NewPlaceScreenProps) => {
    return {
        headerTitle: 'New Place'
    } as StackNavigationOptions;
};

export default NewPlaceScreen;
