import { Action } from 'redux';
import { Place } from '../../models/Place';

export enum PlacesActionType {
    FETCH_PLACES = 'FETCH_PLACES',
    FETCH_PLACES_START = 'FETCH_PLACES_START',
    FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS',
    FETCH_PLACES_FAIL = 'FETCH_PLACES_FAIL',

    DELETE_PLACE = 'DELETE_PLACE',
    DELETE_PLACE_START = 'DELETE_PLACE_START',
    DELETE_PLACE_SUCCESS = 'DELETE_PLACE_SUCCESS',
    DELETE_PLACE_FAIL = 'DELETE_PLACE_FAIL'
}

export interface PlacesAction extends Action<PlacesActionType> {}

export interface FetchPlacesSuccessAction extends PlacesAction {
    places: Place[]
}

export interface FetchPlacesFailAction extends PlacesAction {
    error: string
}

export interface DeletePlaceAction extends PlacesAction {
    place: Place
}

export interface DeletePlaceStartAction extends DeletePlaceAction {}

export interface DeletePlaceSuccessAction extends DeletePlaceAction {}

export interface DeletePlaceFailAction extends DeletePlaceAction {
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

export const deletePlace = (place: Place): DeletePlaceAction => {
    return {
        type: PlacesActionType.DELETE_PLACE,
        place: place
    };
};

export const deletePlaceStart = (place: Place): DeletePlaceStartAction => {
    return {
        type: PlacesActionType.DELETE_PLACE_START,
        place: place
    };
};

export const deletePlaceSuccess = (place: Place): DeletePlaceSuccessAction => {
    return {
        type: PlacesActionType.DELETE_PLACE_SUCCESS,
        place: place
    };
};

export const deletePlaceFail = (place: Place, error: string): DeletePlaceFailAction => {
    return {
        type: PlacesActionType.DELETE_PLACE_FAIL,
        place: place,
        error: error
    };
};
