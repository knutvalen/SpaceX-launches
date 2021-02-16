export default function HomeReducer(state, action) {
    switch (action.type) {
        case "setDelay":
            return {
                ...state,
                delay: action.data,
            };

        case "setCount":
            return {
                ...state,
                count: action.data,
            };

        case "setCountdown":
            return {
                ...state,
                countdown: action.data,
            };

        case "setUpcomingLaunches":
            return {
                ...state,
                upcomingLaunches: action.data,
            };

        case "onError":
            return {
                ...state,
                hasErrored: true,
                error: action.error,
            };

        case "onErrorHandled":
            return {
                ...state,
                hasErrored: false,
                error: null,
            };

        default:
            return state;
    }
};