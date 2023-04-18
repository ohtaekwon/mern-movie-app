import React from "react";
import * as Redux from "react-redux";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "redux/store";
import { setListFavorites, setUser } from "redux/features/userSlice";
import userApis from "lib/api/modules/user.api";
import favoriteApis from "lib/api/modules/favorite.api";

import GlobalLoading from "components/GlobalLoading";
import Header from "components/Header";
import AuthModal from "./AuthModal";

const Layout = () => {
  const dispatch = Redux.useDispatch();
  const { user } = Redux.useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApis.getInfo();
      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);

  React.useEffect(() => {
    const getFavorites = async () => {
      const { response, error } = await favoriteApis.getList();
      if (response) dispatch(setListFavorites(response));
      if (error) dispatch(setListFavorites([]));
    };
    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);

  return (
    <>
      {/* global Loading */}
      <GlobalLoading />
      {/* global Loading */}
      {/* Login Modal */}
      <AuthModal />
      {/* Login Modal */}
      <Box display="flex" minHeight="100vh">
        <Header />
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default Layout;
