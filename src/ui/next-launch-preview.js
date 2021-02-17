import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@material-ui/core";
import { useContext } from "react";
import { GlobalContext } from "../global-state";
import Link from "next/link";

export default function NextLaunchPreview({ countdown, launch }) {
    const { setSelectedLaunch } = useContext(GlobalContext);

    function onDetailsClick() {
        setSelectedLaunch(launch);
    }

    return (
        <Card>
            <CardActionArea onClick={() => onDetailsClick()}>
                <Link href="/details">
                    <CardContent>
                        {countdown && (
                            <Typography variant="h1" align="center">
                                {countdown}
                            </Typography>
                        )}
                        {launch && (
                            <Typography variant="subtitle1">
                                {launch.name}
                            </Typography>
                        )}
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Link href="/details">
                    <Button color="secondary" onClick={() => onDetailsClick()}>
                        Details
                </Button>
                </Link>
            </CardActions>
        </Card>
    );
};