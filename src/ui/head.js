import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function Head() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6">
                    Page name here
                </Typography>
            </Toolbar>
        </AppBar>
    );
};