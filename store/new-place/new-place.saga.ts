import * as FileSystem from 'expo-file-system';
import { SQLResultSet } from 'expo-sqlite/src/SQLite.types';
import { put, takeEvery } from 'redux-saga/effects';
import { Nullable } from '../../models/Nullable';
import { Place } from '../../models/Place';
import * as DatabaseService from '../../services/database.service';
import * as NavigationService from '../../services/navigation.service';
import * as NewPlaceActions from './new-place.actions';
import { AddPlaceAction, NewPlaceActionType } from './new-place.actions';

export function* watchNewPlaceSaga() {
    yield takeEvery(NewPlaceActionType.ADD_PLACE, addPlaceSaga)
}

function* addPlaceSaga(action: AddPlaceAction) {
    yield put(NewPlaceActions.addPlaceStart());
    const fileName: Nullable<string> = action.imageUri.split('/').pop();
    if (fileName) {
        const newPath: string = FileSystem.documentDirectory + fileName;
        try {
            yield FileSystem.moveAsync({
                from: action.imageUri,
                to: newPath
            });
            const place: Place = {
                id: 0,
                imageUri: newPath,
                location: action.location,
                name: action.name,
                description: action.description
            };
            const insertResult: SQLResultSet = yield DatabaseService.insertPlace(place);
            place.id = insertResult.insertId;
            yield put(NewPlaceActions.addPlaceSuccess(place));
            NavigationService.navigate('PlacesList');
        } catch (error) {
            console.log(error);
            yield put(NewPlaceActions.addPlaceFail('Error while saving place.'));
        }
    } else {
        yield put(NewPlaceActions.addPlaceFail('Error while saving place.'));
    }
}
