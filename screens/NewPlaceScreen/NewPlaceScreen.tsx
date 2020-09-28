import React, { useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import {
    View,
    ScrollView,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Alert,
    Keyboard
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import MapPreview from '../../components/MapPreview/MapPreview';
import InputControl from '../../components/UI/InputControl/InputControl';
import ScreenLoader from '../../components/UI/ScreenLoader/ScreenLoader';
import { COLORS } from '../../constants/colors';
import { useProgressionStateObserver } from '../../hooks/transaction-state-observer.hook';
import { Nullable } from '../../models/Nullable';
import { ProgressionState } from '../../models/ProgressionState';
import { PlacesNavigatorParams } from '../../navigation/AppNavigator';
import { Location } from '../../models/Location';
import { RootState } from '../../store/store';
import * as NewPlaceActions from '../../store/new-place/new-place.actions';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import CameraAction from '../../components/CameraAction/CameraAction';

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
    const addPlaceState: ProgressionState = useSelector(
        (state: RootState) => state.newPlaceState.addPlaceState
    );

    const [showLoader, setShowLoader] = useState(false);

    const dispatch: Dispatch<Action> = useDispatch();

    useProgressionStateObserver(
        addPlaceState,
        () => setShowLoader(true),
        () => setShowLoader(false),
        (error: string) => {
            setShowLoader(false);
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    );

    const onShowFullPhoto = () => {
        Keyboard.dismiss();
        props.navigation.navigate(PlacesNavigatePath.PHOTO_MODAL, { uri: imageUri })
    }

    const onChangePhoto = () => {
        Keyboard.dismiss();
        props.navigation.push(PlacesNavigatePath.CAMERA, { navigateTo: PlacesNavigatePath.NEW_PLACE });
    };

    const onChangeLocation = () => {
        Keyboard.dismiss();
        props.navigation.push(PlacesNavigatePath.PICK_LOCATION, { initialLocation: location });
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
                            <View style={ styles.photoContainer }>
                                <PhotoPreview uri={ imageUri } onPress={ onShowFullPhoto }/>
                                <View style={ styles.changePhotoButtonContainer }>
                                    <CameraAction iconName="ios-camera" onPress={ onChangePhoto }/>
                                </View>
                            </View>
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
    photoContainer: {
        width: '100%',
        height: 200
    },
    changePhotoButtonContainer: {
        position: 'absolute',
        bottom: 0
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
