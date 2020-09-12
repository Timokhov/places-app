import { Action } from 'redux';
import { Place } from '../../models/Place';

export enum PlacesActionType {
    FETCH_PLACES = 'FETCH_PLACES',
    FETCH_PLACES_START = 'FETCH_PLACES_START',
    FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS',
    FETCH_PLACES_FAIL = 'FETCH_PLACES_FAIL',

    ADD_PLACE = 'ADD_PLACE',
    ADD_PLACE_START = 'ADD_PLACE_START',
    ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS',
    ADD_PLACE_FAIL = 'ADD_PLACE_FAIL'
}

export interface PlacesAction extends Action<PlacesActionType> {}

export interface FetchPlacesSuccessAction extends PlacesAction {
    places: Place[]
}

export interface FetchPlacesFailAction extends PlacesAction {
    error: string
}

export interface AddPlaceAction extends PlacesAction {
    place: Place
}

export interface AddPlaceSuccessAction extends AddPlaceAction {}

export interface AddPlaceFailAction extends PlacesAction {
    error: string
}

export const fetchPlaces = (): PlacesAction => {
    return {
        type: PlacesActionType.FETCH_PLACES
    };
};

export const fetchPlacesStart = (): PlacesAction => {
    return {
        type: PlacesActionType.FETCH_PLACES_START
    };
};

export const fetchPlacesSuccess = (places: Place[]): FetchPlacesSuccessAction => {
    return {
        type: PlacesActionType.FETCH_PLACES_SUCCESS,
        places: places
    };
};

export const fetchPlacesFail = (error: string): FetchPlacesFailAction => {
    return {
        type: PlacesActionType.FETCH_PLACES_FAIL,
        error: error
    };
};

export const addPlace = (place: Place): AddPlaceAction => {
    return {
        type: PlacesActionType.ADD_PLACE,
        place: place
    };
};

export const addPlaceStart = (): PlacesAction => {
    return {
        type: PlacesActionType.ADD_PLACE_START
    };
};

export const addPlaceSuccess = (place: Place): AddPlaceSuccessAction => {
    return {
        type: PlacesActionType.ADD_PLACE_SUCCESS,
        place: place
    };
};

export const addPlaceFail = (error: string): AddPlaceFailAction => {
    return {
        type: PlacesActionType.ADD_PLACE_FAIL,
        error: error
    };
};
