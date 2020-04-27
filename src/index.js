import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://8b91867b.ap.ngrok.io/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const token = localStorage.getItem('token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axios.interceptors.response.use(
    (response) => {
        console.log(response);
        // Edit response config
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
