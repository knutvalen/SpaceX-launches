import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useReducer } from "react";
import useCountdown from "../hooks/useCountdown";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Home() {
    const classes = useStyles();
    const { count } = useCountdown(10);// hard-code 10 seconds countdown for now

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

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
                {count > 0
                    ? `Countdown timer: ${count}`
                    : `Liftoff!`
                }
            </div>
            {nextLaunch && (
                <div>Next launch is: {nextLaunch.date_utc}</div>
            )}
        </main>
    );
};

export default Home;