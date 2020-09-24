import { put, takeEvery, race, call, take } from 'redux-saga/effects';
import { Location } from '../../models/Location';
import { PermissionResponse, PermissionStatus } from 'expo-permissions/src/Permissions.types';
import * as ExpoPermissions from 'expo-permissions';
import { LocationData } from 'expo-location/src/Location';
import * as ExpoLocation from 'expo-location';
import { GoogleGeocodeResponse } from '../../models/Google';
import * as GoogleService from '../../services/google.service';
import * as PickLocationActions from './pick-location.actions';
import { PickLocationActionType, SelectLocationAction } from './pick-location.actions';

export function* watchPickLocationSaga() {
    yield takeEvery(PickLocationActionType.SELECT_LOCATION, function* (action: SelectLocationAction) {
        yield race({
            task: call(selectLocationSaga, action),
            cancel: take(PickLocationActionType.STOP_PICK_LOCATION)
        });
    });

    yield takeEvery(PickLocationActionType.GET_MY_LOCATION, function* () {
        yield race({
            task: call(getMyLocationSaga),
            cancel: take(PickLocationActionType.STOP_PICK_LOCATION)
        });
    });
}

function* selectLocationSaga(action: SelectLocationAction) {
    yield put(PickLocationActions.selectLocationStart());
    const address: string = yield getAddress(action.latitude, action.longitude);
    const selectedLocation: Location = {
        latitude: action.latitude,
        longitude: action.longitude,
        address: address
    };
    yield put(PickLocationActions.setLocation(selectedLocation));
}

function* getMyLocationSaga() {
    yield put(PickLocationActions.getMyLocationStart());
    try {
        const result: PermissionResponse = yield ExpoPermissions.askAsync(ExpoPermissions.LOCATION);
        if (result.status === PermissionStatus.GRANTED) {
            const result: LocationData = yield ExpoLocation.getCurrentPositionAsync({ timeout: 5000 });
            const address: string = yield getAddress(result.coords.latitude, result.coords.longitude);
            const userLocation: Location = {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
                address: address
            };
            yield put(PickLocationActions.setLocation(userLocation));
        } else {
            yield put(PickLocationActions.getMyLocationFail('Permission denied.'));
        }
    } catch (error) {
        yield put(PickLocationActions.getMyLocationFail(error.message));
    }
}

async function getAddress(latitude: number, longitude: number): Promise<String> {
    const geocodeResponse: GoogleGeocodeResponse = await GoogleService.geocode(latitude, longitude);
    return geocodeResponse.results[0].formatted_address
        ? geocodeResponse.results[0].formatted_address
        : 'Address is not found.';
}
