import { makeStyles } from "@material-ui/core";
import { withRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../global-state";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Launch({ router }) {
    const classes = useStyles();
    const { setPageName } = useContext(GlobalContext);

    useEffect(() => {
        setPageName("Launch details");

        console.log("---> router.query");
        console.log(router.query);
        console.log("<--- router.query");
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
        </main>
    );
};

export default withRouter(Launch);