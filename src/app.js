import { makeStyles, createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import Head from "./ui/head";
import Home from "./ui/home";

const useStyles = makeStyles((theme) => ({
    root: { display: "flex" },
}));

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: green,
    },
});

const layoutToShow = (layoutName) => {
    switch (layoutName) {
        case "home":
            return <Home />;

        default:
            return <div>Not found</div>
    }
};

function App({ layoutName }) {
    const classes = useStyles();
    
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <Head />
                {layoutToShow(layoutName)}
            </div>
        </MuiThemeProvider>
    );
};

export default App;