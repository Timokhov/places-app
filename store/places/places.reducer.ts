import { Place } from '../../models/Place';
import {
    AddPlaceAction,
    AddPlaceFailAction,
    AddPlaceSuccessAction, FetchPlacesFailAction, FetchPlacesSuccessAction,
    PlacesAction,
    PlacesActionType
} from './places.actions';

export interface StorageState {
    inProgress: boolean,
    error: string
}

export interface PlacesState {
    places: Place[],
    addPlaceState: StorageState,
    fetchPlacesState: StorageState
}

const initialState: PlacesState = {
    places: [],
    addPlaceState: {
        inProgress: false,
        error: ''
    },
    fetchPlacesState: {
        inProgress: false,
        error: ''
    }
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

const onAddPlaceStart = (state: PlacesState, action: PlacesAction): PlacesState => {
    return {
        ...state,
        addPlaceState: {
            inProgress: true,
            error: ''
        }
    };
};

const onAddPlaceSuccess = (state: PlacesState, action: AddPlaceSuccessAction): PlacesState => {
    return {
        ...state,
        places: state.places.concat(action.place),
        addPlaceState: {
            inProgress: false,
            error: ''
        }
    };
};

const onAddPlaceFail = (state: PlacesState, action: AddPlaceFailAction): PlacesState => {
    return {
        ...state,
        addPlaceState: {
            inProgress: false,
            error: action.error
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
        case PlacesActionType.ADD_PLACE_START:
            return onAddPlaceStart(state, action as AddPlaceAction);
        case PlacesActionType.ADD_PLACE_SUCCESS:
            return onAddPlaceSuccess(state, action as AddPlaceSuccessAction);
        case PlacesActionType.ADD_PLACE_FAIL:
            return onAddPlaceFail(state, action as AddPlaceFailAction);
        default:
            return state;
    }
};

export default placesReducer;