import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import placesReducer, { PlacesState } from './places/places.reducer';

export interface RootState {
    placesState: PlacesState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        placesState: placesReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));