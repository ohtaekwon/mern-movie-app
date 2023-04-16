import React from "react";
import { Props } from "./PageWrapper.types";
import { useDispatch } from "react-redux";
import { setAppState } from "redux/features/appStateSlice";

const PageWrapper = ({ state, children }: React.PropsWithChildren<Props>) => {
  const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.

  React.useEffect(() => {
    /**
     * 문서의 지정된 위치로 스크롤
     * x좌표 0, y좌표 0
     */
    window.scrollTo(0, 0);

    // 변경할 appState의 reducer
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return <>{children}</>;
};

export default PageWrapper;
