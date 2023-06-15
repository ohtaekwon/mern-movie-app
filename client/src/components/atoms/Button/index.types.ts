import type { ButtonHTMLAttributes, CSSProperties } from "react";
import uiConfig from "styles/ui.cofing";

export type ButtonType =
  | "primary"
  | "default"
  | "zinc_500"
  | "zinc_200"
  | "zinc_300"
  | "zinc_200_filled"
  | "tdred_400"
  | "zinc_700_fill"
  | "tdblue_300_fill"
  | "blackText_1_fill"
  | "skyblue_300_fill"
  | "skyblue_400_fill"
  | "skyblue_500_fill"
  | "skyblue_400"
  | "vermillion_400_fill"
  | "skyblue_100"
  | "tdred_100"
  | "zinc_200_reverse"
  | "tdred_400_fill";

export interface ButtonProps {
  /** * @description 1️⃣ Button 컴포넌트의 style 을 설정합니다. */

  /**
   * 버튼의 variant을 설정합니다.
   * @default default @required
   */
  variant: ButtonType;

  /**
   * Button 내의 텍스트 폰트 사이즈를 설정합니다.
   * @default 'regular'
   */
  fontSize?: keyof typeof uiConfig.theme.fontSize;

  /**
   * Button 내의 텍스트 폰트 높이를 설정합니다.
   * @default 'regular'
   */
  lineHeight?: keyof typeof uiConfig.theme.lineHeight;

  /**
   * Button 내의 텍스트 폰트 두께를 설정합니다.
   * @default 400
   */
  fontWeight?: CSSProperties["fontWeight"];

  /**
   * Button의 배경 색상을 설정합니다.
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof uiConfig.theme.colors;

  /**
   * Button의 radius 설정합니다.
   * @default 8
   */
  radius?: number;

  /**
   * Button의 margin 상단을 설정합니다.
   * @default 0
   */
  marginTop?: number;

  /**
   * Button의 margin 우측을 설정합니다.
   * @default 0
   */
  marginRight?: number;

  /**
   * Button의 margin 하단을 설정합니다.
   * @default 0
   */
  marginBottom?: number;

  /**
   * Button의 margin 좌측을 설정합니다.
   * @default 0
   */
  marginLeft?: number;

  /**
   * Button의 padding x축을 설정합니다.
   * @default 16
   */
  paddingX?: number;

  /**
   * Button의 padding y축을 설정합니다.
   * @default 8
   */
  paddingY?: number;

  /**
   * Button의 width를 설정합니다.
   * @default 'auto'
   */
  width?: CSSProperties["width"];

  /**
   * Button의 width를 설정합니다.
   * @default 'auto'
   */
  height?: CSSProperties["height"];

  /**
   * Button의 position의 타입을 설정합니다.
   * @default static
   */
  position?: CSSProperties["position"];

  /**
   * Button의 z-index 의 타입을 설정합니다.
   * @default static
   */
  zIndex?: CSSProperties["zIndex"];

  /**
   * Button의 top을 설정합니다.
   * @default static
   */
  top?: CSSProperties["top"];

  /**
   * Button의 bottom을 설정합니다.
   * @default static
   */
  bottom?: CSSProperties["bottom"];

  /**
   *  Button의 right을 설정합니다.
   *
   * @default static
   */
  right?: CSSProperties["right"];

  /**
   *  Button의 left을 설정합니다.
   *
   * @default static
   */
  left?: CSSProperties["left"];
}

export interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  /**
   * Button의 area-label을 설정합니다.
   * @default static
   */
  areaLabel?: string;

  /**
   * Button의 type을 설정합니다.
   * @default static
   */
  type?: "button" | "submit" | "reset" | undefined;
}
