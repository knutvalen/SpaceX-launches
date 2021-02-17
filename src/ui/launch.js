import {
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Grid,
    Typography,
    Paper,
    ListItemIcon,
    Button
} from "@material-ui/core";
import axios from "axios";
import { withRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../global-state";
import { OpenInNew } from "@material-ui/icons";

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
            ) :
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={10} md={9} lg={7} xl={5}>
                        <Paper elevation={5} className={classes.content}>
                            {launch && (
                                <div>
                                    <Typography variant="h4">
                                        {launch.name}
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="Launch time" secondary={launch.date_utc} />
                                        </ListItem>
                                        {launch.links.reddit.campaign && (
                                            <ListItem button onClick={() => window.open(launch.links.reddit.campaign)}>
                                                <ListItemIcon>
                                                    <OpenInNew />
                                                </ListItemIcon>
                                                <ListItemText primary="Reddit" />
                                            </ListItem>
                                        )}
                                        {launch.links.wikipedia && (
                                            <ListItem button onClick={() => window.open(launch.links.wikipedia)}>
                                                <ListItemIcon>
                                                    <OpenInNew />
                                                </ListItemIcon>
                                                <ListItemText primary="Wikipedia" />
                                            </ListItem>
                                        )}
                                    </List>
                                </div>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            }
        </main>
    );
};

export default withRouter(Launch);