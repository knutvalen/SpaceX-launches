import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";

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
            return <div>Hello world</div>;

        default:
            return <div>Not found</div>
    }
};

function App({ layoutName }) {
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                {layoutToShow(layoutName)}
            </div>
        </MuiThemeProvider>
    );
};

export default App;