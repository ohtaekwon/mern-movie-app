import { css } from "@emotion/react";
import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Flex = React.forwardRef(function Flex(
  {
    as = "div",
    /** 배치 설정*/
    display = "flex",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    alignContent = "normal",
    wrap = "nowrap",
    /** 배경/테두리 스타일 설정 */
    backgroundColor = "inherit",
    /** 간격 설정 */
    gap = 0,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Flex
      /** HTML태그 설정 */
      as={as}
      /** 배치 설정 */
      display={display}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      wrap={wrap}
      /** 배경/테두리 스타일 설정 */
      backgroundColor={backgroundColor}
      /** 간격 설정*/
      gap={gap}
      /** Other */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Flex>
  );
});

export default Flex;
