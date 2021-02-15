import axios from "axios";
import { useEffect, useReducer } from "react";

function launchReducer(state, action) {
    switch (action.type) {
        case "setNextLaunch": { 
            return {
                ...state,
                nextLaunch: action.data,
                hasErrored: false,
                error: null,
            };
        }

        case "setError": { 
            return {
                ...state,
                hasErrored: true,
                error: action.error
            };
        }

        default:
            return state;
    }
}

function useLaunchInteractor() {
    const [
        { nextLaunch, upcomingLaunches, hasErrored, error },
        dispatch
    ] = useReducer(launchReducer, {
        nextLaunch: null,
        upcomingLaunches: [],
        hasErrored: false,
        error: null,
    });

    useEffect(() => {
        const getNextLaunches = async function () {
            try {
                let result = await axios.get("https://api.spacexdata.com/v4/launches/upcoming");
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        };

        const getNextLaunch = async function () {
            try {
                let result = await axios.get("https://api.spacexdata.com/v4/launches/next");
                console.log(result);
                dispatch({ type: "setNextLaunch", data: result.data });
            } catch (e) {
                console.log(e);
                dispatch({ type: "setError", error: e });
            }
        };

        getNextLaunches();
        getNextLaunch();
    }, []);

    return {
        nextLaunch,
        upcomingLaunches,
        hasErrored,
        error
    };
};

export default useLaunchInteractor;