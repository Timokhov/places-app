import { SQLResultSet } from 'expo-sqlite/src/SQLite.types';
import { put, takeEvery } from 'redux-saga/effects';
import { Place } from '../../models/Place';
import { AddPlaceAction, PlacesActionType } from './places.actions';
import * as FileSystem from 'expo-file-system';
import * as PlacesActions from './places.actions';
import * as DatabaseService from '../../services/database.service';

export function* watchPlacesSaga() {
    yield takeEvery(PlacesActionType.FETCH_PLACES, fetchPlacesSaga);
    yield takeEvery(PlacesActionType.ADD_PLACE, addPlaceSaga)
}

function* fetchPlacesSaga() {
    yield put(PlacesActions.fetchPlacesStart());
    try {
        const result: SQLResultSet = yield DatabaseService.fetchPlaces();
        const places: Place[] = [];
        for (let i = 0; i < result.rows.length; i++) {
            places.push(result.rows.item(i));
        }
        yield put(PlacesActions.fetchPlacesSuccess(places));
    } catch (error) {
        console.log(error);
        yield put(PlacesActions.fetchPlacesFail('Error while fetching places.'));
    }
}

function* addPlaceSaga(action: AddPlaceAction) {
    yield put(PlacesActions.addPlaceStart());
    const place: Place = { ...action.place };
    const fileName: string | undefined = place.imageUri.split('/').pop();
    if (fileName) {
        const newPath: string = FileSystem.documentDirectory + fileName;
        try {
            yield FileSystem.moveAsync({
                from: action.place.imageUri,
                to: newPath
            });
            place.imageUri = newPath;
            const result: SQLResultSet = yield DatabaseService.insertPlace(place);
            place.id = result.insertId;
            yield put(PlacesActions.addPlaceSuccess(place));
        } catch (error) {
            console.log(error);
            yield put(PlacesActions.addPlaceFail('Error while saving place.'));
        }
    } else {
        yield put(PlacesActions.addPlaceFail('Error while saving place.'));
    }
}
