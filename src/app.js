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

function App() {
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                hello world
            </div>
        </MuiThemeProvider>
    );
};

export default App;