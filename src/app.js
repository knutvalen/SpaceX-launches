import { makeStyles, createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import { GlobalProvider } from "./global-state";
import Head from "./ui/head";
import Home from "./ui/home";
import Launch from "./ui/launch";

const useStyles = makeStyles((theme) => ({
    root: { display: "flex" },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: green[500],
        }
    },
});

const layoutToShow = (layoutName) => {
    switch (layoutName) {
        case "home":
            return <Home />;

        case "details":
            return <Launch />;

        default:
            return null;
    }
};

export default function App({ layoutName }) {
    const classes = useStyles();
    const layout = layoutToShow(layoutName);

    return (
        <GlobalProvider>
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    {layout ? (
                        <div>
                            <Head />
                            {layout}
                        </div>
                    ) : (
                            <div>Not found</div>
                        )
                    }
                </div>
            </MuiThemeProvider>
        </GlobalProvider>
    );
};