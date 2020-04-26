const Reducer = (state, action) => {
    switch (action.type) {
        case 'change-user':
            return { ...state, user: action.payload };
        case 'update-zones':
            return { ...state, zones: action.payload };
        case 'update-registrationData':
            return {
                ...state,
                registrationData: {
                    ...state.registrationData,
                    ...action.payload,
                },
            };
        case 'update-user':
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        case 'create-flock':
            return {
                ...state,
                createFlock: action.payload,
            };
        case 'update-hno':
            return {
                ...state,
                hno: action.payload,
            };
        // case 'update-editAccount':
        //     return {
        //         ...state,
        //         editAccount: { ...state.dailyData, ...action.payload },
        //     };
        case 'update-unqChicken':
            return {
                ...state,
                unqChicken: action.payload,
            };
        case 'update-chickenFlock':
            return {
                ...state,
                chickenFlock: action.payload,
            };
        case 'update-chickenFlockInfo':
            return {
                ...state,
                chickenFlockInfo: action.payload,
            };
        case 'update-workerAccount':
            return {
                ...state,
                workerAccount: action.payload,
            };
        case 'update-workerAccountInfo':
            return {
                ...state,
                workerAccountInfo: {
                    ...state.workerAccountInfo,
                    ...action.payload,
                },
            };
        case 'update-dailyData':
            return {
                ...state,
                dailyData: action.payload,
            };
        case 'clear-selectedHno':
            return {
                ...state,
                selectedHno: 1,
            };
        case 'clear-user':
            return {
                ...state,
                user: {},
            };
        case 'update-unqChicken':
            return {
                ...state,
                unqChicken: action.payload,
            };
        case 'update-deadChicken-location':
            return {
                ...state,
                deadChickenLocation: action.payload,
            };
        case 'update-deadChicken-map':
            return {
                ...state,
                deadChickenMap: action.payload,
            };
        default:
            return { state };
    }
};

export default Reducer;
