import { Place } from '../../models/Place';
import { AddPlaceAction, PlacesAction, PlacesActionType } from './places.actions';

export interface PlacesState {
    places: Place[]
}

const initialState: PlacesState = {
    places: []
};

const onAddPlace = (state: PlacesState, action: AddPlaceAction): PlacesState => {
    return {
        places: state.places.concat(action.place)
    }
}

const placesReducer = (state: PlacesState = initialState, action: PlacesAction): PlacesState => {
    switch (action.type) {
        case PlacesActionType.ADD_PLACE:
            return onAddPlace(state, action as AddPlaceAction);
        default:
            return state;
    }
};

export default placesReducer;