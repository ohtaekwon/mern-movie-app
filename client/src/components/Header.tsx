import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";
import { ScrollAppProps } from "./Header.types";
import Logo from "components/Logo";

import { themeModes } from "configs/theme.config";
import menuConfigs from "configs/menu.config";

import { setThemeMode } from "redux/features/themeModeSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import UserMenu from "components/UserMenu";
import SideBar from "./SideBar";

const ScrollAppBar = ({
  window,
  children,
}: React.PropsWithChildren<ScrollAppProps>) => {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  /**
   * @description useScrollTrigger는 크롤 시 특정 이벤트를 트리거하며 options에는 각각 @argument disableHysteresis  @argument threshold  @argument target 를 받는다.
   * @argument disableHysteresis 스크롤 이벤트를 트리거할 때, hysteresis를 비활성화 @default false
   * @argument threshold 스크롤 이벤트를 트리거할 스크롤 위치를 지정하고 0~1의 값이다. @default 100%
   * @argument target Window객체나 HTMLElement객체를 전달 @default window
   *
   */
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  /**
   * @description React.cloneElement(element, [props], [...children])
   * @argument element 복제할 React요소
   * @argument props 새로운 객체 속성
   */

  return React.cloneElement(<>{children}</>, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { appState } = useSelector((state: RootState) => state.appState);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);
  const dispatch = useDispatch();
  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme as "dark" | "light"));
  };

  const toggleSideBar = () =>
    setSideBarOpen((prev) => {
      return !prev;
    });
  return (
    <>
      <SideBar isOpen={sideBarOpen} toggleSideBar={toggleSideBar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 99 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSideBar}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>
            {/* main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* main menu */}

            {/* user menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Header;
