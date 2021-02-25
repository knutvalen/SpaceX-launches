import styled from "styled-components";
import {
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  buttonStyle
} from "styled-system";

import Box from "./Box";
const themed = key => props => props.theme[key];

const Button = styled(Box)(
  {
    appearance: "none",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "inherit",
    textDecoration: "none"
  },
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  themed("Button")
);

Button.propTypes = {
  ...fontWeight.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...buttonStyle.propTypes
};

Button.defaultProps = {
  as: "button",
  fontSize: "inherit",
  fontWeight: "bold",
  margin: 0,
  px: 3,
  py: 2,
  color: "white",
  backgroundColor: "blue",
  border: 0,
  borderRadius: 4
};

export default Button;