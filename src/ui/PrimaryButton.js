import Button from './Button';
import styled from 'styled-components';

const PrimaryButton = styled(Button)(
  props => ({
    background: props.theme.colors.primaryColor,
    color: props.theme.colors.primaryTextColor,
    '&:hover': {
      background: props.theme.colors.primaryDarkColor,
    },
  }),
);

export default PrimaryButton;