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
                user: action.payload,
            };
        case 'update-hno':
            return {
                ...state,
                selectedHno: action.payload,
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
        default:
            return { state };
    }
};

export default Reducer;
