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
        default:
            return { state };
    }
};

export default Reducer;
