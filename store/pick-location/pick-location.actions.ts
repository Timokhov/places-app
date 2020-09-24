import { Action } from 'redux';
import { Location } from '../../models/Location';

export enum PickLocationActionType {
    SELECT_LOCATION = 'SELECT_LOCATION',
    SELECT_LOCATION_START = 'SELECT_LOCATION_START',
    GET_MY_LOCATION = 'GET_MY_LOCATION',
    GET_MY_LOCATION_START = 'GET_MY_LOCATION_START',
    GET_MY_LOCATION_FAIL = 'GET_MY_LOCATION_FAIL',
    STOP_PICK_LOCATION = 'STOP_PICK_LOCATION',
    SET_LOCATION = 'SET_LOCATION',
    CLEAR_LOCATION = 'CLEAR_LOCATION'
}

export interface PickLocationAction extends Action<PickLocationActionType> {}

export interface SelectLocationAction extends PickLocationAction {
    latitude: number,
    longitude: number
}

export interface GetMyLocationFailAction extends PickLocationAction {
    error: string
}

export interface SetLocationAction extends PickLocationAction {
    location: Location
}

export const selectLocation = (latitude: number, longitude: number): SelectLocationAction => {
    return {
        type: PickLocationActionType.SELECT_LOCATION,
        latitude: latitude,
        longitude: longitude
    }
}

export const selectLocationStart = (): PickLocationAction => {
    return {
        type: PickLocationActionType.SELECT_LOCATION_START
    };
};

export const getMyLocation = (): PickLocationAction => {
    return {
        type: PickLocationActionType.GET_MY_LOCATION
    };
};

export const getMyLocationStart = (): PickLocationAction => {
    return {
        type: PickLocationActionType.GET_MY_LOCATION_START
    };
};

export const getMyLocationFail = (error: string): GetMyLocationFailAction => {
    return {
        type: PickLocationActionType.GET_MY_LOCATION_FAIL,
        error: error
    };
};

export const stopPickLocation = (): PickLocationAction => {
    return {
        type: PickLocationActionType.STOP_PICK_LOCATION
    };
};

export const setLocation = (location: Location): SetLocationAction => {
    return {
        type: PickLocationActionType.SET_LOCATION,
        location: location
    };
};

export const clearLocation = (): PickLocationAction => {
    return {
        type: PickLocationActionType.CLEAR_LOCATION
    };
};
