import Button from './Button';
import styled from 'styled-components';

const SecondaryButton = styled(Button)(
  props => ({
    background: props.theme.colors.secondaryColor,
    color: props.theme.colors.secondaryTextColor,
    '&:hover': {
      background: props.theme.colors.secondaryDarkColor,
    },
  }),
);

export default SecondaryButton;