import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>Countdown timer here</div>
            <div>Hello world</div>
        </main>
    );
};

export default Home;