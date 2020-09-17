import { ENV } from '../env';
import { GoogleGeocodeResponse } from '../models/Google';

export const geocode = async (latitude: number, longitude: number): Promise<GoogleGeocodeResponse> => {
    const response: Response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ENV.googleApiKey}`);
    if (!response.ok) {
        throw new Error('Something went wrong');
    }
    const geocodeResponse: GoogleGeocodeResponse = await response.json();
    if (!geocodeResponse.results) {
        throw new Error('Something went wrong');
    }

    return geocodeResponse;
};
