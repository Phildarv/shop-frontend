import React from "react";
import styled from "styled-components";

import { borders, shadows, colors } from "../utilities/style";

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: -4.5rem;
  right: -5rem;

  max-height: 15rem;
  overflow-y: auto;

  margin-top: 1rem;
  padding: 0.5rem;

  background-color: #fff;
  color: #000;
  border-radius: ${borders.radius};
  border: ${colors.primaryContrast} 1px solid;
`;

export default Dropdown;
