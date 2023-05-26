import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "redux/store";
import { setListFavorites, setUser } from "redux/features/userSlice";
import userApis from "lib/api/modules/user.api";
import favoriteApis from "lib/api/modules/favorite.api";

import GlobalLoading from "components/GlobalLoading";
import Header from "components/Header";
import AuthModal from "components/Auth/AuthModal";
import { Box } from "@mui/material";

const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

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
      if (error) toast.error(error.message);
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
        {/* header */}
        <Header />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>
    </>
  );
};
export default Layout;
