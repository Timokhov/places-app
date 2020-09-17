import { Location } from './Location';

export interface Place {
    id: number,
    imageUri: string,
    location: Location,
    name: string,
    description: string
}
