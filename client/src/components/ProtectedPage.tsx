import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { RootState } from "redux/store";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return <>{user ? children : null}</>;
};

export default ProtectedPage;
