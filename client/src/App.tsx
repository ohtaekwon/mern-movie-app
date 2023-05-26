import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import themeConfigs from "configs/theme.config";
import { RootState } from "redux/store";
import routes from "routes/router";
import PageWrapper from "components/PageWrapper";
import Layout from "components/Layout";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Global, ThemeProvider } from "@emotion/react";
import uiConfig from "styles/ui.cofing";

const App = () => {
  // const theme = useTheme();
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  return (
    <ThemeProvider theme={uiConfig.theme}>
      <MuiThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
        {/* Toastify config */}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme={themeMode}
        />
        {/* mui reset css */}
        <CssBaseline />

        {/* app routes */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {routes.map((route, index) =>
                // 경로가 인덱스 경로인지 확인합니다. 인덱스 경로는 부모의 URL에서 부모의 Outlet 으로 렌더링하게 된다.
                route.index ? (
                  <Route
                    index
                    key={index}
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                )
              )}
            </Route>
          </Routes>
          <Global styles={uiConfig.globalStyle} />
        </BrowserRouter>
        {/* app routes */}
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default App;
