import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonProps } from "./index.types";

export const Button = styled.button<Required<ButtonProps>>`
  /**
  * 넓이/높이 설정
  */
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  /**
  * 배치 설정
  */
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  z-index: ${({ zIndex }) => zIndex};
  /**
   * font 스타일 설정
  */
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHeight, theme }) => theme.lineHeight[lineHeight]};
  /**
  * padding 설정
  */
  padding: ${({ paddingX, paddingY }) => `${paddingY}px ${paddingX}px`};
  /**
  * margin 설정
  */
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  /**
  * 배경/테두리 스타일 설정
  */
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
  border-radius: ${({ radius }) => `${radius}px`};
  border-width: 1px;
  border-style: solid;
  color: ${({ color }) => color};
  ${({ variant, theme }) => {
    switch (variant) {
      case "primary": {
        return css`
          border-color: ${theme.colors.tdgreen_400};
          background-color: ${theme.colors.tdgreen_400};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdgreen_500};
            background-color: ${theme.colors.tdgreen_500};
            color: ${theme.colors.white};
          }
        `;
      }
      case "zinc_500": {
        return css`
          border-color: ${theme.colors.zinc_500};
          background-color: ${theme.colors.white};
          color: ${theme.colors.zinc_500};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_700};
            background-color: ${theme.colors.white};
            color: ${theme.colors.zinc_700};
          }
        `;
      }
      case "zinc_200": {
        return css`
          border-color: ${theme.colors.zinc_200};
          background-color: ${theme.colors.white};
          color: ${theme.colors.zinc_400};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_200};
            background-color: ${theme.colors.zinc_200};
            color: ${theme.colors.blackText_1};
          }
        `;
      }
      case "zinc_300": {
        return css`
          border-color: ${theme.colors.zinc_300};
          background-color: ${theme.colors.white};
          color: ${theme.colors.zinc_400};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_400};
            background-color: ${theme.colors.white};
            color: ${theme.colors.zinc_700};
          }
        `;
      }
      case "zinc_200_filled": {
        return css`
          border-color: ${theme.colors.zinc_200};
          background-color: ${theme.colors.zinc_200};
          color: ${theme.colors.zinc_500};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_300};
            background-color: ${theme.colors.zinc_300};
            color: ${theme.colors.zinc_600};
          }
        `;
      }
      case "zinc_200_reverse": {
        return css`
          border-color: ${theme.colors.transparent};
          background-color: ${theme.colors.transparent};
          color: ${theme.colors.blackText_1};
          opacity: 0.5;
          transition: all 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_200};
            background-color: ${theme.colors.zinc_200};
            color: ${theme.colors.blackText_1};
            opacity: 1;
          }
          &:active {
            border-color: ${theme.colors.zinc_200};
            background-color: ${theme.colors.white};
            color: ${theme.colors.blackText_1};
            opacity: 1;
          }
        `;
      }
      case "zinc_700_fill": {
        return css`
          border-color: ${theme.colors.zinc_700};
          background-color: ${theme.colors.zinc_700};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_900};
            background-color: ${theme.colors.zinc_900};
            color: ${theme.colors.white};
          }
        `;
      }
      case "tdred_100": {
        return css`
          border-color: ${theme.colors.tdred_100};
          background-color: ${theme.colors.white};
          color: ${theme.colors.tdred_300};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdred_100};
            background-color: ${theme.colors.tdred_100};
            color: ${theme.colors.tdred_400};
          }
        `;
      }
      case "tdred_400": {
        return css`
          border-color: ${theme.colors.tdred_400};
          background-color: ${theme.colors.white};
          color: ${theme.colors.tdred_400};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdred_500};
            background-color: ${theme.colors.white};
            color: ${theme.colors.tdred_500};
          }
        `;
      }
      case "tdred_400_fill": {
        return css`
          border-color: ${theme.colors.tdred_400};
          background-color: ${theme.colors.tdred_400};
          color: ${theme.colors.tdred_50};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdred_500};
            background-color: ${theme.colors.tdred_500};
            color: ${theme.colors.tdred_50};
          }
        `;
      }
      case "blackText_1_fill": {
        return css`
          border-color: ${theme.colors.blackText_1};
          background-color: ${theme.colors.blackText_1};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_700};
            background-color: ${theme.colors.zinc_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "skyblue_100": {
        return css`
          border-color: ${theme.colors.skyblue_100};
          background-color: ${theme.colors.skyblue_500};
          color: ${theme.colors.skyblue_100};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_200};
            background-color: ${theme.colors.skyblue_200};
            color: ${theme.colors.skyblue_500};
          }
        `;
      }
      case "skyblue_500_fill": {
        return css`
          border-color: ${theme.colors.skyblue_500};
          background-color: ${theme.colors.skyblue_500};
          color: ${theme.colors.skyblue_100};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.skyblue_700};
            background-color: ${theme.colors.skyblue_700};
            color: ${theme.colors.skyblue_100};
          }
          &:disabled {
            border-color: ${theme.colors.zinc_200};
            background-color: ${theme.colors.zinc_200};
            color: ${theme.colors.zinc_400};
          }
        `;
      }
      case "skyblue_400_fill": {
        return css`
          border-color: ${theme.colors.skyblue_400};
          background-color: ${theme.colors.skyblue_400};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.skyblue_500};
            background-color: ${theme.colors.skyblue_500};
            color: ${theme.colors.white};
          }
        `;
      }
      case "skyblue_300_fill": {
        return css`
          border-color: ${theme.colors.skyblue_300};
          background-color: ${theme.colors.skyblue_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.skyblue_400};
            background-color: ${theme.colors.skyblue_400};
            color: ${theme.colors.white};
          }
        `;
      }
      case "tdblue_300_fill": {
        return css`
          border-color: ${theme.colors.tdblue_300};
          background-color: ${theme.colors.tdblue_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdblue_400};
            background-color: ${theme.colors.tdblue_400};
            color: ${theme.colors.white};
          }
        `;
      }
      case "skyblue_400": {
        return css`
          border-color: transparent;
          background-color: transparent;
          color: ${theme.colors.skyblue_400};
          transition: color 0.15s ease-in-out;
          &:hover {
            color: ${theme.colors.skyblue_500};
          }
        `;
      }
      case "vermillion_400_fill": {
        return css`
          border-color: ${theme.colors.vermillion_400};
          background-color: ${theme.colors.vermillion_400};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.vermillion_500};
            background-color: ${theme.colors.vermillion_500};
            color: ${theme.colors.white};
          }
        `;
      }
      default: {
        return css`
          border-color: ${theme.colors.transparent};
          background-color: ${theme.colors.transparent};
          /* color: ${theme.colors.blackText_1_fill}; */
          transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.transparent};
            color: ${theme.colors.blackText_1_fill};
          }
        `;
      }
    }
  }};
`;

export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
