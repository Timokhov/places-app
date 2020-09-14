import { Location } from '../models/Location';
import { ENV } from '../env';
import { GoogleGeocodeResponse } from '../models/google';

export const geocode = async (location: Location): Promise<GoogleGeocodeResponse> => {
    const response: Response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`);
    if (!response.ok) {
        throw new Error('Something went wrong');
    }
    const geocodeResponse: GoogleGeocodeResponse = await response.json();
    if (!geocodeResponse.results) {
        throw new Error('Something went wrong');
    }

    return geocodeResponse;
}