import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { withRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../global-state";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        padding: theme.spacing(3),
    },
}));

function Launch({ router }) {
    const classes = useStyles();
    const { setPageName } = useContext(GlobalContext);
    const [launch, setLaunch] = useState();
    const isLoading = !launch;

    useEffect(() => {
        const refresh = async function () {
            try {
                const launch = await axios.get(`https://api.spacexdata.com/v4/launches/${router.query.id}`);
                console.log(launch.data);
                setLaunch(launch.data);
            } catch (error) {
                console.log(error);
            }
        };

        setPageName("Launch details");
        refresh();
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                    <div>{launch.name}</div>
                )
            }
        </main>
    );
};

export default withRouter(Launch);