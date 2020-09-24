import * as FileSystem from 'expo-file-system';
import { SQLResultSet } from 'expo-sqlite/src/SQLite.types';
import { put, takeEvery, race, call, take } from 'redux-saga/effects';
import { Nullable } from '../../models/Nullable';
import { Place } from '../../models/Place';
import * as DatabaseService from '../../services/database.service';
import * as NavigationService from '../../services/navigation.service';
import * as NewPlaceActions from './new-place.actions';
import * as PickLocationActions from '../pick-location/pick-location.actions';
import { AddPlaceAction, CapturePhotoAction, NewPlaceActionType } from './new-place.actions';
import { CameraCapturedPicture } from 'expo-camera/src/Camera.types';
import { PlacesNavigatePath } from '../../navigation/navigation.utils';

export function* watchNewPlaceSaga() {
    yield takeEvery(NewPlaceActionType.CAPTURE_PHOTO, function* (action: CapturePhotoAction) {
        yield race({
            task: call(capturePhotoSaga, action),
            cancel: take(NewPlaceActionType.STOP_CAPTURE_PHOTO)
        });
    });

    yield takeEvery(NewPlaceActionType.ADD_PLACE, addPlaceSaga)
}

function* capturePhotoSaga(action: CapturePhotoAction) {
    const photo: CameraCapturedPicture = yield action.cameraRef.takePictureAsync({skipProcessing: true});
    if (photo) {
        yield put(NewPlaceActions.setImageUri(photo.uri));
        yield NavigationService.navigate(action.navigateTo);
    }
}

function* addPlaceSaga(action: AddPlaceAction) {
    yield put(NewPlaceActions.addPlaceStart());
    yield put(PickLocationActions.clearLocation());
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
            NavigationService.navigate(PlacesNavigatePath.PLACES_LIST);
        } catch (error) {
            console.log(error);
            yield put(NewPlaceActions.addPlaceFail('Error while saving place.'));
        }
    } else {
        yield put(NewPlaceActions.addPlaceFail('Error while saving place.'));
    }
}
