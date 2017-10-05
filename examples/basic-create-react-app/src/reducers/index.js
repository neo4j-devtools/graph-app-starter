const initialState = {
    apiVersion: 'unknown',
    context: {
        global: {
            settings: {}
        },
        projects: []
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case 'API_VERSION':
        return {
            ...state,
            apiVersion: action.version,
        };
    case 'CONTEXT_UPDATE':
        return {
            ...state,
            context: action.context
        };
    default:
        return state;
    }
}
