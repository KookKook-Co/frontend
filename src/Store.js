import React, { createContext, useReducer } from 'react';

import Reducer from './Reducer';

const initialState = {
    user: {},
    zones: [],
    registrationData: {},
    hno: [],
    // editAccount: {},
    unqChicken: {},
    deadChickenLocation: {},
    deadChickenMap: {},
    chickenFlock: [],
    chickenFlockInfo: {},
    createFlock: {},
    workerAccount: [],
    workerAccountInfo: {},
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    let value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export default Store;
