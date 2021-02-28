import {
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Grid,
    Typography,
    Paper,
    ListItemIcon,
    Button,
    Box
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
    const [hasErrored, setHasErrored] = useState(false);
    const isLoading = !launch;

    function refresh() {
        new Promise(resolve => {
            const result = axios.get(`https://api.spacexdata.com/v4/launches/${router.query.id}`);
            resolve(result);
        }).then(launch => {
            console.log(launch.data);
            setLaunch(launch.data);
        }).catch(error => {
            console.log(error);
            setHasErrored(true);
        });
    };

    useEffect(() => {
        setPageName("Launch details");
        refresh();
    }, []);

    useEffect(() => {
        if (launch) {
            setHasErrored(false);
        }
    }, [launch]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {hasErrored ? (
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="overline" align="center">
                                An error occured
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Button color="secondary" onClick={() => refresh()}>
                                Reload page
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            ) : isLoading ? (
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