import { ProgressionState } from '../../models/ProgressionState';
import { Nullable } from '../../models/Nullable';
import { Location } from '../../models/Location';
import {
    GetMyLocationFailAction,
    PickLocationAction,
    PickLocationActionType,
    SetLocationAction
} from './pick-location.actions';

export interface PickLocationState {
    selectLocationState: ProgressionState,
    getMyLocationState: ProgressionState,
    location: Nullable<Location>
}

const initialState: PickLocationState = {
    selectLocationState: {
        inProgress: false,
        error: ''
    },
    getMyLocationState: {
        inProgress: false,
        error: ''
    },
    location: null,
}

const onSelectLocationStart = (state: PickLocationState, action: PickLocationAction): PickLocationState => {
    return {
        ...state,
        selectLocationState: {
            inProgress: true,
            error: ''
        }
    }
}

const onGetMyLocationStart = (state: PickLocationState, action: PickLocationAction): PickLocationState => {
    return {
        ...state,
        getMyLocationState: {
            inProgress: true,
            error: ''
        }
    };
};

const onGetMyLocationFail = (state: PickLocationState, action: GetMyLocationFailAction): PickLocationState => {
    return {
        ...state,
        getMyLocationState: {
            inProgress: false,
            error: action.error
        }
    };
};

const onSetLocation = (state: PickLocationState, action: SetLocationAction): PickLocationState => {
    return {
        ...state,
        selectLocationState: {
            inProgress: false,
            error: ''
        },
        getMyLocationState: {
            inProgress: false,
            error: ''
        },
        location: action.location
    };
};

const onClearLocation = (state: PickLocationState, action: PickLocationAction): PickLocationState => {
    return initialState;
}

const pickLocationReducer = (state: PickLocationState = initialState, action: PickLocationAction): PickLocationState => {
    switch (action.type) {
        case PickLocationActionType.SELECT_LOCATION_START:
            return onSelectLocationStart(state, action);
        case PickLocationActionType.GET_MY_LOCATION_START:
            return onGetMyLocationStart(state, action);
        case PickLocationActionType.GET_MY_LOCATION_FAIL:
            return onGetMyLocationFail(state, action as GetMyLocationFailAction);
        case PickLocationActionType.SET_LOCATION:
            return onSetLocation(state, action as SetLocationAction);
        case PickLocationActionType.CLEAR_LOCATION:
            return onClearLocation(state, action);
        default:
            return state;
    }
}

export default pickLocationReducer;
