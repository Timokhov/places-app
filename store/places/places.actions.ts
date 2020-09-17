import { Action } from 'redux';
import { Place } from '../../models/Place';

export enum PlacesActionType {
    FETCH_PLACES = 'FETCH_PLACES',
    FETCH_PLACES_START = 'FETCH_PLACES_START',
    FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS',
    FETCH_PLACES_FAIL = 'FETCH_PLACES_FAIL'
}

export interface PlacesAction extends Action<PlacesActionType> {}

export interface FetchPlacesSuccessAction extends PlacesAction {
    places: Place[]
}

export interface FetchPlacesFailAction extends PlacesAction {
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
