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

function Home() {
    const classes = useStyles();
    const [delay, setDelay] = useState();
    const [count, setCount] = useState(0);
    const callbackRef = useRef();

    useEffect(() => {
        new Promise(resolve => {
            let result = axios.get("https://api.spacexdata.com/v4/launches/next");
            resolve(result);
        }).then(nextLaunch => {
            console.log(nextLaunch.data.date_unix);
            setDelay(1000);
            setCount(10);//TODO: use nextLaunch.data.date_unix to calculate the diff in seconds
        });
    }, []);

    useEffect(() => {
        callbackRef.current = () => setCount(count - 1);
    }, [count]);

    useEffect(() => {
        function tick() {
            callbackRef.current();
        };

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {count && count > 0 && (
                <div>T minus {count}</div>
            )}
        </main>
    );
};

export default Home;