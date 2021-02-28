import { useRouter } from "next/router";
import Box from "../ui/Box";
import Card from "../ui/Card";
import Text from '../ui/Text';
import Grid from '../ui/Grid';
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import SecondaryButton from "../ui/SecondaryButton";

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
      <SecondaryButton onClick={() => onDetailsClick()}>
        DETAILS
      </SecondaryButton>
    </Card>
  );
};