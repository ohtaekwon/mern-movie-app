import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setThemeMode } from "redux/features/themeModeSlice";

import { Props } from "./SideBar.types";
import uiConfigs from "configs/ui.config";
import { themeModes } from "configs/theme.config";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import Logo from "./Logo";
import menuConfigs from "configs/menu.config";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggleSideBar }: React.PropsWithChildren<Props>) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { appState } = useSelector((state: RootState) => state.appState);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const sideBarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme as "dark" | "light"));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>

        {/* LIST */}
        <List sx={{ paddingX: "30px" }}>
          <Typography variant="h6" marginBottom="20px">
            Menu
          </Typography>
          {menuConfigs.main.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: "10px",
                marginY: 1,
                backgroundColor: appState.includes(item.state)
                  ? "primary.main"
                  : "unset",
              }}
              component={Link}
              to={item.path}
              onClick={toggleSideBar}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">
                    {item.display}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}

          {user && (
            <>
              <Typography variant="h6" marginBottom="20px">
                PERSONAL
              </Typography>
              {menuConfigs.user.map((item, index) => (
                <ListItemButton
                  key={index}
                  sx={{
                    borderRadius: "10px",
                    marginY: 1,
                    backgroundColor: appState.includes(item.state)
                      ? "primary.main"
                      : "unset",
                  }}
                  component={Link}
                  to={item.path}
                  onClick={toggleSideBar}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography textTransform="uppercase">
                        {item.display}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </>
          )}

          <Typography variant="h6" marginBottom="20px">
            THEME
          </Typography>
          <ListItemButton onClick={onSwitchTheme}>
            <ListItemIcon>
              {themeMode === themeModes.dark && <DarkModeOutlined />}
              {themeMode === themeModes.light && <WbSunnyOutlined />}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {themeMode === themeModes.dark ? "dark mode" : "light mode"}
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Toolbar>
    </>
  );

  return (
    <Drawer
      open={isOpen}
      onClose={toggleSideBar}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sideBarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default SideBar;
