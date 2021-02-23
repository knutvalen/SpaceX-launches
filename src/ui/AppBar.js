import styled from 'styled-components';
import { space } from 'styled-system'

export const AppBar = styled('div')(
  props => ({
    backgroundColor: props.theme.primaryColor,
    color: props.theme.primaryTextColor,
    fontSize: 18,
    boxShadow: `0px 4px 4px ${props.theme.shadowColor}`,
  }),
  space,
);