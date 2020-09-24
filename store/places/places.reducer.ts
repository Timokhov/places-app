import { Place } from '../../models/Place';
import { ProgressionState } from '../../models/ProgressionState';
import {
    DeletePlaceFailAction, DeletePlaceStartAction,
    DeletePlaceSuccessAction,
    FetchPlacesFailAction,
    FetchPlacesSuccessAction,
    PlacesAction,
    PlacesActionType
} from './places.actions';

export interface PlacesState {
    places: Place[],
    fetchPlacesState: ProgressionState,
    deletePlaceStatesMap: { [index: number]: ProgressionState }
}

const initialState: PlacesState = {
    places: [],
    fetchPlacesState: {
        inProgress: false,
        error: ''
    },
    deletePlaceStatesMap: {}
};

const onFetchPlacesStart = (state: PlacesState, action: PlacesAction): PlacesState => {
    return {
        ...state,
        fetchPlacesState: {
            inProgress: true,
            error: ''
        }
    };
};

const onFetchPlacesSuccess = (state: PlacesState, action: FetchPlacesSuccessAction): PlacesState => {
    return {
        ...state,
        places: action.places,
        fetchPlacesState: {
            inProgress: false,
            error: ''
        }
    };
};

const onFetchPlacesFail = (state: PlacesState, action: FetchPlacesFailAction): PlacesState => {
    return {
        ...state,
        places: [],
        fetchPlacesState: {
            inProgress: false,
            error: action.error
        }
    };
};

const onDeletePlaceStart = (state: PlacesState, action: DeletePlaceStartAction): PlacesState => {
    return {
        ...state,
        deletePlaceStatesMap: {
            ...state.deletePlaceStatesMap,
            [action.place.id]: {
                inProgress: true,
                error: ''
            }
        }
    };
};

const onDeletePlaceSuccess = (state: PlacesState, action: DeletePlaceSuccessAction): PlacesState => {
    return {
        ...state,
        places: state.places.filter(place => place.id !== action.place.id),
        deletePlaceStatesMap: {
            ...state.deletePlaceStatesMap,
            [action.place.id]: {
                inProgress: false,
                error: ''
            }
        }
    };
};

const onDeletePlaceFail = (state: PlacesState, action: DeletePlaceFailAction): PlacesState => {
    return {
        ...state,
        deletePlaceStatesMap: {
            ...state.deletePlaceStatesMap,
            [action.place.id]: {
                inProgress: false,
                error: action.error
            }
        }
    };
};

const placesReducer = (state: PlacesState = initialState, action: PlacesAction): PlacesState => {
    switch (action.type) {
        case PlacesActionType.FETCH_PLACES_START:
            return onFetchPlacesStart(state, action);
        case PlacesActionType.FETCH_PLACES_SUCCESS:
            return onFetchPlacesSuccess(state, action as FetchPlacesSuccessAction);
        case PlacesActionType.FETCH_PLACES_FAIL:
            return onFetchPlacesFail(state, action as FetchPlacesFailAction);
        case PlacesActionType.DELETE_PLACE_START:
            return onDeletePlaceStart(state, action as DeletePlaceStartAction);
        case PlacesActionType.DELETE_PLACE_SUCCESS:
            return onDeletePlaceSuccess(state, action as DeletePlaceSuccessAction);
        case PlacesActionType.DELETE_PLACE_FAIL:
            return onDeletePlaceFail(state, action as DeletePlaceFailAction);
        default:
            return state;
    }
};

export default placesReducer;
