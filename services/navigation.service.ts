import { NavigationContainerRef } from '@react-navigation/native';
import { Nullable } from '../models/Nullable';
import { PlacesNavigatePath } from '../navigation/navigation.utils';

let navigator: Nullable<NavigationContainerRef> = undefined;

export const init = (nav: Nullable<NavigationContainerRef>) => {
    if (nav) {
        navigator = nav;
    }
};

export const navigate = (path: PlacesNavigatePath, params?: any) => {
    if (navigator) {
        navigator.navigate(path, params);
    }
};
