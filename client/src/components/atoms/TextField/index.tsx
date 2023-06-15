import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const TextField = ({}: React.PropsWithChildren<Props>) => {
  return (
    <Styled.Wrapper>
      <Styled.Inner></Styled.Inner>
    </Styled.Wrapper>
  );
};

export default TextField;
