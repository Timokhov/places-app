import { Place } from '../../models/Place';
import { TransactionState } from '../../models/TransactionState';
import {
    FetchPlacesFailAction,
    FetchPlacesSuccessAction,
    PlacesAction,
    PlacesActionType
} from './places.actions';

export interface PlacesState {
    places: Place[],
    fetchPlacesState: TransactionState
}

const initialState: PlacesState = {
    places: [],
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

const placesReducer = (state: PlacesState = initialState, action: PlacesAction): PlacesState => {
    switch (action.type) {
        case PlacesActionType.FETCH_PLACES_START:
            return onFetchPlacesStart(state, action);
        case PlacesActionType.FETCH_PLACES_SUCCESS:
            return onFetchPlacesSuccess(state, action as FetchPlacesSuccessAction);
        case PlacesActionType.FETCH_PLACES_FAIL:
            return onFetchPlacesFail(state, action as FetchPlacesFailAction);
        default:
            return state;
    }
};

export default placesReducer;
