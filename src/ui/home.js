import { makeStyles } from "@material-ui/core";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [delay, setDelay] = useState();
    const [count, setCount] = useState();
    const [countdown, setCountdown] = useState();
    const callbackRef = useRef();
    let countdownTimerID;

    function refresh() {
        new Promise(resolve => {
            const result = axios.get("https://api.spacexdata.com/v4/launches/next");
            resolve(result);
        }).then(nextLaunch => {
            if (nextLaunch.data.date_utc) {
                setDelay(1000);
                const now = new Date().getTime();
                const nextLaunchTime = new Date(nextLaunch.data.date_utc).getTime();
                const diffSeconds = Math.floor((nextLaunchTime - now) / 1000);
                setCount(diffSeconds);
            } else {
                setCount(null);
            }
        });
    }

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        function tick() {
            callbackRef.current();
        };

        if (delay) {
            countdownTimerID = setInterval(tick, delay);
            return () => clearInterval(countdownTimerID);
        }
    }, [delay]);

    useEffect(() => {
        callbackRef.current = () => setCount(count - 1);

        function formatCountdown(count) {
            const days = Math.floor(count / (60 * 60 * 24));
            const hours = Math.floor((count % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((count % (60 * 60)) / 60);
            const seconds = Math.floor(count % 60);
            return `${days}d ${hours}t ${minutes}m ${seconds}s`;
        };

        if (count > 0) {
            const countdown = formatCountdown(count);
            console.log(countdown);
            setCountdown(countdown);
        }

        if (count === 0) {
            setCountdown("Liftoff!");
        }

        if (count < 0) {
            clearInterval(countdownTimerID);
            refresh();
        }
    }, [count]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {countdown && (
                <div>{countdown}</div>
            )}
        </main>
    );
};