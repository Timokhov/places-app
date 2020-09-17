import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as ExpoFont from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as DatabaseService from './services/database.service';

const fetchFonts = () => {
    return ExpoFont.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const App = () => {

    const [isAppInitialized, setAppInitialized] = useState<boolean>(false);

    const init = async () => {
        await [fetchFonts(), DatabaseService.init()];
    };

    if (!isAppInitialized) {
        return <AppLoading startAsync={ init } onFinish={ () => setAppInitialized(true) }/>
    } else {
        return (
            <Provider store={ store }>
                <AppNavigator/>
            </Provider>
        );
    }
};

export default App;
