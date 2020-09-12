import React, { useState } from 'react';
import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as DatabaseService from './services/database.service';



const App = () => {

    const [isAppInitialized, setAppInitialized] = useState(false);

    if (!isAppInitialized) {
        return <AppLoading startAsync={ DatabaseService.init } onFinish={ () => setAppInitialized(true) }/>
    }

    return (
        <Provider store={ store }>
            <AppNavigator/>
        </Provider>
    );
};

export default App;
