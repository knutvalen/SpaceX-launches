import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@material-ui/core";

export default function NextLaunchPreview({ countdown, launch }) {

    function onDetailsClick() {
        //TODO
    }

    return (
        <Card>
            <CardActionArea onClick={() => onDetailsClick()}>
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
            </CardActionArea>
            <CardActions>
                <Button color="secondary" onClick={() => onDetailsClick()}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};