import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
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

    useEffect(() => {
        const getNextLaunches = async function() {
            try {
                let result = await axios.get("https://api.spacexdata.com/v4/launches/upcoming");
                console.log(result)
            } catch (e) {
                console.log(e)
            }
        };

        const getNextLaunch = async function() {
            try {
                let result = await axios.get("https://api.spacexdata.com/v4/launches/next");
                console.log(result)
            } catch (e) {
                console.log(e)
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
            <div>Hello world</div>
        </main>
    );
};

export default Home;