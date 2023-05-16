import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Button = React.forwardRef(function Button(
  {
    /** @description HTML태그 설정 */
    type = "button",
    areaLabel = "",
    /** @description Button의 유형 설정 */
    variant = "default",
    /** @description 넓이/높이 설정 */
    width = "auto",
    height = "auto",
    /** @description 배치 설정 */
    position = "static",
    zIndex = "auto",
    top = "inherit",
    left = "inherit",
    bottom = "inherit",
    right = "inherit",
    /** @description 배경/테두리 스타일 설정 */
    backgroundColor = "inherit",
    radius = 8,
    /** @description padding 설정 */
    paddingX = 16,
    paddingY = 8,
    /** @description font 스타일 설정 */
    fontSize = "md",
    lineHeight = "md",
    fontWeight = 400,
    /** @description margin 설정 */
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLButtonElement>
) {
  return (
    <Styled.Button
      /** @description HTML태그 설정 */
      type={type}
      aria-label={areaLabel}
      /** @description Button의 유형 설정 */
      variant={variant}
      /** @description 넓이/높이 설정 */
      width={width}
      height={height}
      /** @description 배치 설정 */
      position={position}
      top={top}
      bottom={bottom}
      right={right}
      left={left}
      zIndex={zIndex}
      /** @description font 스타일 설정*/
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      /** @description margin 설정 */
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      /** @description padding 설정 */
      paddingX={paddingX}
      paddingY={paddingY}
      /** @description 배경/테두리 스타일 설정 */
      backgroundColor={backgroundColor}
      radius={radius}
      /** @description ref 설정 */
      ref={forwardedRef}
      {...rest}
    >
      <Styled.InnerWrapper>{children}</Styled.InnerWrapper>
    </Styled.Button>
  );
});

export default Button;
