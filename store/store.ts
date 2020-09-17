import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import newPlaceReducer, { NewPlaceState } from './new-place/new-place.reducer';
import { watchNewPlaceSaga } from './new-place/new-place.saga';
import placesReducer, { PlacesState } from './places/places.reducer';
import { watchPlacesSaga } from './places/places.saga';

export interface RootState {
    placesState: PlacesState,
    newPlaceState: NewPlaceState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        placesState: placesReducer,
        newPlaceState: newPlaceReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchPlacesSaga);
sagaMiddleware.run(watchNewPlaceSaga);
