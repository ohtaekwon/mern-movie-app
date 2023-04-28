import React from "react";
import { Props } from "./PageWrapper.types";
import { useDispatch } from "react-redux";
import { setAppState } from "redux/features/appStateSlice";

const PageWrapper = ({ state, children }: React.PropsWithChildren<Props>) => {
  const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    /**
     * @description 문서의 지정된 위치로 스크롤
     * @argument x x좌표 0
     * @argument y y좌표 0
     */
    window.scrollTo(0, 0);
    /**
     * @description App의 상태관리 Reducer
     */
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return <>{children}</>;
};

export default PageWrapper;
