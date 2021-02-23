import styled from 'styled-components';

export const AppBar = styled.div(
  props => ({
    backgroundColor: props.theme.colors.primaryColor,
    color: props.theme.colors.primaryTextColor,
    fontSize: props.theme.fontSizes[2],
    boxShadow: `0px 4px 4px ${props.theme.colors.shadowColor}`,
    padding: props.theme.space[4],
  }),
);