import { SQLResultSet } from 'expo-sqlite/src/SQLite.types';
import { put, takeEvery } from 'redux-saga/effects';
import { Place } from '../../models/Place';
import { AddPlaceAction, PlacesActionType } from './places.actions';
import * as FileSystem from 'expo-file-system';
import * as PlacesActions from './places.actions';
import * as DatabaseService from '../../services/database.service';
import * as GoogleService from '../../services/google.service';
import { GoogleGeocodeResponse } from '../../models/google';
import { Nullable } from '../../models/nullable';

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
            places.push({
                id: result.rows.item(i).id,
                title: result.rows.item(i).title,
                imageUri: result.rows.item(i).imageUri,
                address: result.rows.item(i).address,
                location: {
                    latitude: result.rows.item(i).lat,
                    longitude: result.rows.item(i).lng
                }
            });
        }
        yield put(PlacesActions.fetchPlacesSuccess(places));
    } catch (error) {
        console.log(error);
        yield put(PlacesActions.fetchPlacesFail('Error while fetching places.'));
    }
}

function* addPlaceSaga(action: AddPlaceAction) {
    yield put(PlacesActions.addPlaceStart());
    const fileName: Nullable<string> = action.imageUri.split('/').pop();
    if (fileName) {
        const newPath: string = FileSystem.documentDirectory + fileName;
        try {
            yield FileSystem.moveAsync({
                from: action.imageUri,
                to: newPath
            });
            const geocodeResponse: GoogleGeocodeResponse = yield GoogleService.geocode(action.location);
            const place: Place = {
                id: 0,
                title: action.title,
                imageUri: newPath,
                address: geocodeResponse.results[0].formatted_address,
                location: action.location
            };
            const insertResult: SQLResultSet = yield DatabaseService.insertPlace(place);
            place.id = insertResult.insertId;
            yield put(PlacesActions.addPlaceSuccess(place));
        } catch (error) {
            console.log(error);
            yield put(PlacesActions.addPlaceFail('Error while saving place.'));
        }
    } else {
        yield put(PlacesActions.addPlaceFail('Error while saving place.'));
    }
}
