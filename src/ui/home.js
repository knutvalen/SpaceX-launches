import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useContext, useReducer } from "react";
import axios from "axios";
import { GlobalContext } from "../global-state";
import LaunchPreview from "./launch-preview";
import HomeReducer from "../reducers/home-reducer";
import NextLaunchPreview from "./next-launch-preview";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const formatCountdown = (count) => {
    const days = Math.floor(count / (60 * 60 * 24));
    const hours = Math.floor((count % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((count % (60 * 60)) / 60);
    const seconds = Math.floor(count % 60);
    return `${days}d ${hours}t ${minutes}m ${seconds}s`;
};

export default function Home() {
    const { setPageName } = useContext(GlobalContext);
    const classes = useStyles();
    const callbackRef = useRef();
    let countdownTimerID;

    const [
        { delay, count, countdown, nextLaunch, upcomingLaunches, hasErrored, error },
        dispatch
    ] = useReducer(HomeReducer, {
        delay: null,
        count: null,
        countdown: null,
        nextLaunch: null,
        upcomingLaunches: [],
        hasErrored: false,
        error: null,
    });

    function refreshNextLaunch() {
        new Promise(resolve => {
            const result = axios.get("https://api.spacexdata.com/v4/launches/next");
            resolve(result);
        }).then(nextLaunch => {
            console.log(nextLaunch.data);
            dispatch({ type: "setNextLaunch", data: nextLaunch.data });
        }).catch(error => {
            dispatch({ type: "onError", error: error });
        });
    };

    useEffect(() => {
        setPageName("Dashboard");
        refreshNextLaunch();

        const refreshUpcomingLaunches = async function () {
            try {
                const upcomingLaunches = await axios.get("https://api.spacexdata.com/v4/launches/upcoming");
                console.log(upcomingLaunches.data);
                dispatch({ type: "setUpcomingLaunches", data: upcomingLaunches.data });
            } catch (error) {
                dispatch({ type: "onError", error: error });
            }
        };

        refreshUpcomingLaunches();
    }, []);

    useEffect(() => {
        if (delay) {
            countdownTimerID = setInterval(() => callbackRef.current(), delay);
            return () => clearInterval(countdownTimerID);
        }
    }, [delay]);

    useEffect(() => {
        callbackRef.current = () => dispatch({ type: "setCount", data: (count - 1) });

        if (count > 0) {
            dispatch({ type: "setCountdown", data: formatCountdown(count) });
        }

        if (count === 0) {
            dispatch({ type: "setCountdown", data: "Liftoff!" });
        }

        if (count < 0) {
            clearInterval(countdownTimerID);
            refreshNextLaunch();
        }
    }, [count]);

    useEffect(() => {
        if (nextLaunch) {
            dispatch({ type: "setDelay", data: 1000 });
            const now = new Date().getTime();
            const nextLaunchTime = new Date(nextLaunch.date_utc).getTime();
            const diffSeconds = Math.floor((nextLaunchTime - now) / 1000);
            dispatch({ type: "setCount", data: diffSeconds });
        } else {
            dispatch({ type: "setCount", data: null });
        }
    }, [nextLaunch]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {hasErrored ? (
                <div>An error occurred</div>
            ) : (
                    <div>
                        {countdown && (
                            <NextLaunchPreview countdown={countdown} launch={nextLaunch} />
                        )}
                        <br/>
                        {upcomingLaunches && upcomingLaunches.map((launch) => (
                            <LaunchPreview key={launch.id} launch={launch} />
                        ))}
                    </div>
                )
            }
        </main>
    );
};