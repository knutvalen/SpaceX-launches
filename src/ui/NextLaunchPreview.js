import { useRouter } from "next/router";
import Box from "./Box";
import Card from "./Card";
import Text from './Text';
import Grid from './Grid';
import Button from './Button';
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export default function NextLaunchPreview({ countdown, launch }) {
  const router = useRouter();
  const themeContext = useContext(ThemeContext);

  function onDetailsClick() {
    router.push({
      pathname: '/details',
      query: {
        id: launch.id
      },
    })
  }

  return (
    <Card>
      {countdown && (
        <Text fontSize={7} textAlign="center" padding={0} margin={0}>
          {countdown}
        </Text>
      )}
      {launch && (
        <Grid>
          <Box margin={4}>
            <Text fontSize={1} padding={0} margin={0}>Name</Text>
            <Text fontSize={0} padding={0} margin={0}>{launch.name}</Text>
          </Box>
          <Box margin={4}>
            <Text fontSize={1} padding={0} margin={0}>Launch time</Text>
            <Text fontSize={0} padding={0} margin={0}>{launch.date_utc}</Text>
          </Box>
        </Grid>
      )}
      <Button
        color={themeContext.colors.secondaryColor}
        backgroundColor="transparent"
        onClick={() => onDetailsClick()}
        fontSize={1}
      >
        DETAILS
      </Button>
    </Card>
  );
};