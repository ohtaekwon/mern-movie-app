import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import uiConfig from "styles/ui.cofing";

export interface FlexProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   * @default div
   */
  as?: ElementType;

  /**
   * FlexBox의 display 속성을 설정합니다.
   * @default 'flex'
   */
  display?: "flex" | "inline-flex";

  /**
   * FlexBox의 flex-direction 속성을 설정합니다.
   * @default 'row'
   */
  direction?: CSSProperties["flexDirection"];

  /**
   * FlexBox의 flex-wrap 속성을 설정합니다.
   * @default 'nowrap'
   */
  wrap?: CSSProperties["flexWrap"];

  /**
   * FlexBox의 justify-content 속성을 설정합니다.
   * @default 'flex-start'
   */
  justifyContent?: CSSProperties["justifyContent"];

  /**
   * FlexBox의 align-items 속성을 설정합니다.
   * @default 'flex-start'
   */
  alignItems?: CSSProperties["alignItems"];

  /**
   * FlexBox의 align-content 속성을 설정합니다.
   * @default 'flex-start'
   */
  alignContent?: CSSProperties["alignContent"];

  /**
   * Flex의 배경 색상을 설정합니다.
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof uiConfig.theme.colors;

  /**
   * Flex의 gap을 설정합니다.
   * @default 0
   */
  gap?: number;
}

export interface Props extends HTMLAttributes<HTMLElement>, FlexProps {}
