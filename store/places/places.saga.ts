import { SQLResultSet } from 'expo-sqlite/src/SQLite.types';
import { put, takeEvery } from 'redux-saga/effects';
import { Place } from '../../models/Place';
import { PlacesActionType } from './places.actions';
import * as PlacesActions from './places.actions';
import * as DatabaseService from '../../services/database.service';

export function* watchPlacesSaga() {
    yield takeEvery(PlacesActionType.FETCH_PLACES, fetchPlacesSaga);
}

function* fetchPlacesSaga() {
    yield put(PlacesActions.fetchPlacesStart());
    try {
        const result: SQLResultSet = yield DatabaseService.fetchPlaces();
        const places: Place[] = [];
        for (let i = 0; i < result.rows.length; i++) {
            places.push({
                id: result.rows.item(i).id,
                imageUri: result.rows.item(i).imageUri,
                location: {
                    latitude: result.rows.item(i).lat,
                    longitude: result.rows.item(i).lng,
                    address: result.rows.item(i).address,
                },
                name: result.rows.item(i).name,
                description: result.rows.item(i).description
            });
        }
        yield put(PlacesActions.fetchPlacesSuccess(places));
    } catch (error) {
        yield put(PlacesActions.fetchPlacesFail('Error while fetching places.'));
    }
}
