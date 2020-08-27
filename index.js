import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import axios from 'axios';

import { name as appName } from './app.json';
import App from './src/App';

import storeConfig from './src/store/storeConfig';

const store = storeConfig();
axios.defaults.baseURL = 'https://lambe-victor.firebaseio.com'

const Redux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Redux);
