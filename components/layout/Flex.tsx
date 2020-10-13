import styled from "styled-components";

export default styled.div<{ flexWrap?: string; marginX?: boolean }>`
  display: flex;
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
  ${({ marginX }) => (marginX ? "margin: 0 -0.5rem !important;" : "")}
`;
