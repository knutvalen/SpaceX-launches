import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useContext, useReducer } from "react";
import axios from "axios";
import { GlobalContext } from "../global-state";
import LaunchPreview from "./launch-preview";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const reducer = (state, action) => {
    switch (action.type) {
        case "setDelay":
            return { ...state, delay: action.data };

        case "setCount":
            return { ...state, count: action.data };

        case "setCountdown":
            return { ...state, countdown: action.data };

        case "setUpcomingLaunches":
            return { ...state, upcomingLaunches: action.data };

        default:
            return state;
    }
};

export default function Home() {
    const { setPageName } = useContext(GlobalContext);
    const classes = useStyles();
    const callbackRef = useRef();
    let countdownTimerID;

    const [
        { delay, count, countdown, upcomingLaunches },
        dispatch
    ] = useReducer(reducer, {
        delay: null,
        count: null,
        countdown: null,
        upcomingLaunches: [],
    });

    function refreshNextLaunch() {
        new Promise(resolve => {
            const result = axios.get("https://api.spacexdata.com/v4/launches/next");
            resolve(result);
        }).then(nextLaunch => {
            console.log(nextLaunch.data);
            if (nextLaunch.data.date_utc) {
                dispatch({ type: "setDelay", data: 1000 });
                const now = new Date().getTime();
                const nextLaunchTime = new Date(nextLaunch.data.date_utc).getTime();
                const diffSeconds = Math.floor((nextLaunchTime - now) / 1000);
                dispatch({ type: "setCount", data: diffSeconds });
            } else {
                dispatch({ type: "setCount", data: null });
            }
        });//TODO: catch exceptions
    };

    function tick() {
        callbackRef.current();
    };

    function formatCountdown(count) {
        const days = Math.floor(count / (60 * 60 * 24));
        const hours = Math.floor((count % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((count % (60 * 60)) / 60);
        const seconds = Math.floor(count % 60);
        return `${days}d ${hours}t ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        setPageName("Dashboard");
        refreshNextLaunch();

        const getNextLaunches = async function () {
            try {
                const result = await axios.get("https://api.spacexdata.com/v4/launches/upcoming");
                console.log(result.data);
                dispatch({ type: "setUpcomingLaunches", data: result.data });
            } catch (e) {
                console.log(e);
            }
        };

        getNextLaunches();
    }, []);

    useEffect(() => {
        if (delay) {
            countdownTimerID = setInterval(tick, delay);
            return () => clearInterval(countdownTimerID);
        }
    }, [delay]);

    useEffect(() => {
        callbackRef.current = () => dispatch({ type: "setCount", data: (count - 1) });

        if (count > 0) {
            const countdown = formatCountdown(count);
            console.log(countdown);
            dispatch({ type: "setCountdown", data: countdown });
        }

        if (count === 0) {
            dispatch({ type: "setCountdown", data: "Liftoff!" });
        }

        if (count < 0) {
            clearInterval(countdownTimerID);
            refreshNextLaunch();
        }
    }, [count]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {countdown && (
                <div>{countdown}</div>
            )}
            {upcomingLaunches && upcomingLaunches.map((launch) => (
                <LaunchPreview key={launch.id} launch={launch} />
            ))}
        </main>
    );
};