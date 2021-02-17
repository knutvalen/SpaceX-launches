import { FormControlLabel, Grid, makeStyles, Switch, Typography } from "@material-ui/core";
import { useEffect, useRef, useContext, useReducer, useMemo } from "react";
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
    const [
        { delay, count, countdown, nextLaunch, upcomingLaunches, descending, hasErrored, error },
        dispatch
    ] = useReducer(HomeReducer, {
        delay: null,
        count: null,
        countdown: null,
        nextLaunch: null,
        upcomingLaunches: [],
        descending: true,
        hasErrored: false,
        error: null,
    });
    const { setPageName } = useContext(GlobalContext);
    const classes = useStyles();
    const callbackRef = useRef();
    let countdownTimerID;
    const isLoading = !upcomingLaunches || !countdown || !nextLaunch;

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
        setPageName("SpaceX launches");
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

    const filteredUpcomingLaunches = useMemo(() => {
        if (upcomingLaunches && nextLaunch) {
            return upcomingLaunches
                .filter(({ id }) => id !== nextLaunch.id)
                .sort((x, y) => {
                    if (x.date_unix < y.date_unix) {
                        return descending ? -1 : 1;
                    }
                    if (x.date_unix > y.date_unix) {
                        return descending ? 1 : -1;
                    }
                    return 0;
                });
        }
    }, [upcomingLaunches, nextLaunch, descending]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {hasErrored ? (
                <div>An error occurred</div>
            ) : isLoading ? (
                <div>Loading...</div>
            ) : (
                        <Grid container justify="flex-start" spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="overline">
                                    Next launch
                            </Typography>
                                <NextLaunchPreview countdown={countdown} launch={nextLaunch} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="overline">
                                    Upcoming launches
                            </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Descending"
                                    control={
                                        <Switch
                                            checked={descending}
                                            onChange={() => dispatch({ type: "toggleDescending" })}
                                        />
                                    }
                                />
                            </Grid>
                            {filteredUpcomingLaunches && filteredUpcomingLaunches.map((launch) => (
                                <Grid item key={launch.id} xs={12} sm={6} md={3} lg={2}>
                                    <LaunchPreview launch={launch} />
                                </Grid>
                            ))}
                        </Grid>
                    )
            }
        </main>
    );
};