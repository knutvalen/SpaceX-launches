import { GlobalProvider } from "./global-state";
import styled, { ThemeProvider } from "styled-components";
import Home from "./layouts/Home";
import Launch from "./layouts/Launch";
import Header from "./layouts/Header";
import { Theme } from "./ui/Theme";
import { CssBaseline } from "@material-ui/core";

const Root = styled.div({
  flexGrow: 1,
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
  const layout = layoutToShow(layoutName);

  return (
    <GlobalProvider>
      <ThemeProvider theme={Theme}>
        <Root>
          <CssBaseline />
          {layout ? (
            <div>
              <Header />
              {layout}
            </div>
          ) :
            <div>Not found</div>
          }
        </Root>
      </ThemeProvider>
    </GlobalProvider>
  );
};