import './App.css';
import './assets/sass/theme.scss';

import AppRouter from './Router.js';
import React from 'react';
import Store from './Store';

function App() {
    return (
        <Store>
            <AppRouter />
        </Store>
    );
}
export default App;
