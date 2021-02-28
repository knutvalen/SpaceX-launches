import styled from 'styled-components';

const Button = styled.button(
  props => ({
    border: 'none',
    borderRadius: props.theme.space[2],
    fontWeight: 500,
    fontSize: props.theme.fontSizes[0],
    padding: props.theme.space[3],
    boxShadow: `0px 1px 2px ${props.theme.colors.shadowColor}`,
    '&:hover': {
      boxShadow: `0px 3px 4px ${props.theme.colors.shadowColor}`,
    },
  }),
);

export default Button;