import { makeStyles } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Home() {
    function useCountdown(seconds) {
        const [count, setCount] = useState(seconds);

        function useInterval(callback, delay) {
            const callbackRef = useRef();

            useEffect(() => {
                console.log(`useEffect callback`)
                callbackRef.current = callback;
            }, [callback]);

            useEffect(() => {
                console.log(`useEffect delay`)
                function tick() {
                    callbackRef.current();
                }

                if (delay !== null) {
                    let id = setInterval(tick, delay);
                    return () => clearInterval(id);
                }
            }, [delay]);
        }

        useInterval(() => {
            setCount(count - 1);
        }, 1000);

        return { count };
    }

    const classes = useStyles();
    const { count } = useCountdown(10)// hard-code 10 seconds countdown for now

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
                {count > 0
                    ? `Countdown timer: ${count}`
                    : `Liftoff!`
                }
            </div>
            <div>Hello world</div>
        </main>
    );
};

export default Home;