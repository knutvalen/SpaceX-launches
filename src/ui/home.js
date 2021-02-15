import { makeStyles } from "@material-ui/core";
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