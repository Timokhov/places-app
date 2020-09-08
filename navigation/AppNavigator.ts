import { createAppContainer } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { COLORS } from '../constants/colors';
import MapScreen from '../screens/MapScreen/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen/NewPlaceScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen/PlaceDetailsScreen';
import PlacesListScreen from '../screens/PlacesListScreen/PlacesListScreen';

const AppNavigator = createStackNavigator(
    {
        PlacesList: PlacesListScreen,
        PlaceDetails: PlaceDetailsScreen,
        NewPlace: NewPlaceScreen,
        Map: MapScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: COLORS.primary
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        }
    }
);

export default createAppContainer(AppNavigator);
