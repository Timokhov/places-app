import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import newPlaceReducer, { NewPlaceState } from './new-place/new-place.reducer';
import { watchNewPlaceSaga } from './new-place/new-place.saga';
import placesReducer, { PlacesState } from './places/places.reducer';
import { watchPlacesSaga } from './places/places.saga';
import pickLocationReducer, { PickLocationState } from './pick-location/pick-location.reducer';
import { watchPickLocationSaga } from './pick-location/pick-location.saga';

export interface RootState {
    placesState: PlacesState,
    pickLocationState: PickLocationState,
    newPlaceState: NewPlaceState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        placesState: placesReducer,
        pickLocationState: pickLocationReducer,
        newPlaceState: newPlaceReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchPlacesSaga);
sagaMiddleware.run(watchPickLocationSaga);
sagaMiddleware.run(watchNewPlaceSaga);
