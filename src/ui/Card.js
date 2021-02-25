import styled from 'styled-components';

const Card = styled.div(
  props => ({
    backgroundColor: 'white',
    color: props.theme.colors.primaryTextColor,
    fontSize: props.theme.fontSizes[2],
    boxShadow: `1px 1px 3px ${props.theme.colors.shadowColor}`,
    padding: props.theme.space[4],
    borderRadius: props.theme.space[2],
  })
);

export default Card;