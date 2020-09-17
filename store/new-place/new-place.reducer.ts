import { Location } from '../../models/Location';
import { Nullable } from '../../models/Nullable';
import { TransactionState } from '../../models/TransactionState';
import {
    AddPlaceFailAction,
    AddPlaceSuccessAction,
    NewPlaceAction,
    NewPlaceActionType,
    SetDescriptionAction,
    SetImageUriAction,
    SetLocationAction,
    SetNameAction
} from './new-place.actions';

export interface NewPlaceState {
    imageUri: string,
    location: Nullable<Location>,
    name: string,
    description: string,
    addPlaceState: TransactionState
}

const initialState: NewPlaceState = {
    imageUri: '',
    location: undefined,
    name: '',
    description: '',
    addPlaceState: {
        inProgress: false,
        error: ''
    }
};

const onCreateNewPlaceStart = (state: NewPlaceState, action: NewPlaceAction): NewPlaceState => {
    return initialState;
};

const onSetImageUri = (state: NewPlaceState, action: SetImageUriAction): NewPlaceState => {
    return {
        ...state,
        imageUri: action.imageUri
    };
};

const onSetLocation = (state: NewPlaceState, action: SetLocationAction): NewPlaceState => {
    return {
        ...state,
        location: action.location
    };
};

const onSetName = (state: NewPlaceState, action: SetNameAction): NewPlaceState => {
    return {
        ...state,
        name: action.name
    };
};

const onSetDescription = (state: NewPlaceState, action: SetDescriptionAction): NewPlaceState => {
    return {
        ...state,
        description: action.description
    };
};

const onAddPlaceStart = (state: NewPlaceState, action: NewPlaceAction): NewPlaceState => {
    return {
        ...state,
        addPlaceState: {
            inProgress: true,
            error: ''
        }
    };
};

const onAddPlaceSuccess = (state: NewPlaceState, action: AddPlaceSuccessAction): NewPlaceState => {
    return initialState;
};

const onAddPlaceFail = (state: NewPlaceState, action: AddPlaceFailAction): NewPlaceState => {
    return {
        ...state,
        addPlaceState: {
            inProgress: false,
            error: action.error
        }
    };
};

const newPlaceReducer = (state: NewPlaceState = initialState, action: NewPlaceAction): NewPlaceState => {
    switch (action.type) {
        case NewPlaceActionType.CREATE_NEW_PLACE_START:
            return onCreateNewPlaceStart(state, action);
        case NewPlaceActionType.SET_IMAGE_URI:
            return onSetImageUri(state, action as SetImageUriAction);
        case NewPlaceActionType.SET_LOCATION:
            return onSetLocation(state, action as SetLocationAction);
        case NewPlaceActionType.SET_NAME:
            return onSetName(state, action as SetNameAction);
        case NewPlaceActionType.SET_DESCRIPTION:
            return onSetDescription(state, action as SetDescriptionAction);
        case NewPlaceActionType.ADD_PLACE_START:
            return onAddPlaceStart(state, action);
        case NewPlaceActionType.ADD_PLACE_SUCCESS:
            return onAddPlaceSuccess(state, action as AddPlaceSuccessAction);
        case NewPlaceActionType.ADD_PLACE_FAIL:
            return onAddPlaceFail(state, action as AddPlaceFailAction);
        default:
            return state;
    }
};

export default newPlaceReducer;
