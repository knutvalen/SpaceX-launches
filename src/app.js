import { GlobalProvider } from "./global-state";
import styled, { ThemeProvider } from "styled-components";
import Head from "./ui/head";
import Home from "./ui/home";
import Launch from "./ui/launch";

const Root = styled.div`
  flex-grow: 1;
`;

const theme = {
  colors: {
    primary: "#2196f3",
    secondary: "#4caf50",
  },
};

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
      <ThemeProvider theme={theme}>
        <Root>
          {layout ? (
            <div>
              <Head />
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