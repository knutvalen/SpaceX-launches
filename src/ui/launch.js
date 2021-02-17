import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Launch() {
    const classes = useStyles();

    return (
        <main>
            <div className={classes.toolbar} />
            <div>Launch details here</div>
        </main>
    );
};