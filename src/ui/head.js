import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useContext } from "react";
import { GlobalContext } from "../global-state";

export default function Head() {
    const { pageName } = useContext(GlobalContext);

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6">
                    {pageName}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};