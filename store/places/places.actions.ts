import { Action } from 'redux';
import { Place } from '../../models/Place';

export enum PlacesActionType {
    ADD_PLACE = 'ADD_PLACE'
}

export interface PlacesAction extends Action<PlacesActionType> {}

export interface AddPlaceAction extends PlacesAction {
    place: Place
}

export const addPlace = (place: Place): AddPlaceAction => {
    return {
        type: PlacesActionType.ADD_PLACE,
        place: place
    };
};