import { Action } from 'redux';
import { Location } from '../../models/Location';
import { Place } from '../../models/Place';
import { Camera } from 'expo-camera';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';

export enum NewPlaceActionType {
    CREATE_NEW_PLACE_START = 'CREATE_NEW_PLACE_START',

    CAPTURE_PHOTO = 'CAPTURE_PHOTO',
    STOP_CAPTURE_PHOTO = 'STOP_CAPTURE_PHOTO',
    SET_IMAGE_URI = 'SET_IMAGE_URI',
    SET_LOCATION = 'SET_LOCATION_TO_NEW_PLACE',
    SET_NAME = 'SET_NAME',
    SET_DESCRIPTION = 'SET_DESCRIPTION',

    ADD_PLACE = 'ADD_PLACE',
    ADD_PLACE_START = 'ADD_PLACE_START',
    ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS',
    ADD_PLACE_FAIL = 'ADD_PLACE_FAIL'
}

export interface NewPlaceAction extends Action<NewPlaceActionType> {}

export interface CapturePhotoAction extends NewPlaceAction {
    cameraRef: Camera,
    navigateTo: PlacesNavigatePath
}

export interface SetImageUriAction extends NewPlaceAction {
    imageUri: string
}

export interface SetLocationAction extends NewPlaceAction {
    location: Location
}

export interface SetNameAction extends NewPlaceAction {
    name: string
}

export interface SetDescriptionAction extends NewPlaceAction {
    description: string
}

export interface AddPlaceAction extends NewPlaceAction {
    imageUri: string,
    location: Location,
    name: string,
    description: string
}

export interface AddPlaceSuccessAction extends NewPlaceAction {
    place: Place
}

export interface AddPlaceFailAction extends NewPlaceAction {
    error: string
}

export const createNewPlaceStart = (): NewPlaceAction => {
    return {
        type: NewPlaceActionType.CREATE_NEW_PLACE_START
    };
};

export const capturePhoto = (cameraRef: Camera, navigateTo: PlacesNavigatePath ): CapturePhotoAction => {
    return {
        type: NewPlaceActionType.CAPTURE_PHOTO,
        cameraRef: cameraRef,
        navigateTo: navigateTo
    };
};

export const stopCapturePhoto = (): NewPlaceAction => {
    return {
        type: NewPlaceActionType.STOP_CAPTURE_PHOTO
    };
};

export const setImageUri = (imageUri: string): SetImageUriAction => {
    return {
        type: NewPlaceActionType.SET_IMAGE_URI,
        imageUri: imageUri
    };
};

export const setLocation = (location: Location): SetLocationAction => {
    return {
        type: NewPlaceActionType.SET_LOCATION,
        location: location
    };
};

export const setName = (name: string): SetNameAction => {
    return {
        type: NewPlaceActionType.SET_NAME,
        name: name
    };
};

export const setDescription = (description: string): SetDescriptionAction => {
    return {
        type: NewPlaceActionType.SET_DESCRIPTION,
        description: description
    };
};

export const addPlace = (imageUri: string, location: Location, name: string, description: string): AddPlaceAction => {
    return {
        type: NewPlaceActionType.ADD_PLACE,
        imageUri: imageUri,
        location: location,
        name: name,
        description: description
    };
};

export const addPlaceStart = (): NewPlaceAction => {
    return {
        type: NewPlaceActionType.ADD_PLACE_START
    };
};

export const addPlaceSuccess = (place: Place): AddPlaceSuccessAction => {
    return {
        type: NewPlaceActionType.ADD_PLACE_SUCCESS,
        place: place
    };
};

export const addPlaceFail = (error: string): AddPlaceFailAction => {
    return {
        type: NewPlaceActionType.ADD_PLACE_FAIL,
        error: error
    };
};
