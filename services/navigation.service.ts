import { NavigationContainerRef } from '@react-navigation/native';
import { Nullable } from '../models/Nullable';

let navigator: Nullable<NavigationContainerRef> = undefined;

export const init = (nav: Nullable<NavigationContainerRef>) => {
    if (nav) {
        navigator = nav;
    }
};

export const navigate = (rout: string, params?: any) => {
    if (navigator) {
        navigator.navigate(rout, params);
    }
};
