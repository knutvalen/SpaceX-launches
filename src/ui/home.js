import { makeStyles } from "@material-ui/core";
import useCountdown from "../hooks/useCountdown";
import useLaunchInteractor from "../hooks/useLaunchInteractor";

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
    const { nextLaunch, upcomingLaunches, hasErrored, error } = useLaunchInteractor();

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