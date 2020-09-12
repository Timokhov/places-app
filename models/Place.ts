import { Location } from './Location';

export interface Place {
    id: number,
    title: string,
    imageUri: string,
    address: string,
    location: Location
}
