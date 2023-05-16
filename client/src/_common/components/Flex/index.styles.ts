import styled from "@emotion/styled";
import { FlexProps } from "./index.types";

export const Flex = styled.span<Required<FlexProps>>`
  /** 배치 설정 */
  display: ${({ display }) => display};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  /** 배경/테두리 스타일 설정 */
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  /** 간격 설정 */
  gap: ${({ gap }) => gap};
  box-sizing: border-box;
`;
