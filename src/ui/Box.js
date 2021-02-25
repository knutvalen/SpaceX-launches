import styled from "styled-components";
import {
  space,
  color,
  width,
  fontSize,
  flex,
  order,
  alignSelf,
  borders,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  height,
  gridArea
} from "styled-system";

const themed = key => props => props.theme[key];

const Box = styled("div")(
  {
    boxSizing: "border-box"
  },
  space,
  color,
  width,
  fontSize,
  flex,
  order,
  alignSelf,
  borders,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  height,
  gridArea,
  props => props.css,
  themed("Box")
);

Box.displayName = "Box";

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes
};

export default Box;