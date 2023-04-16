import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import Logo from "components/Logo";

const GlobalLoading = () => {
  const { globalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // if (globalLoading) {
    //   setIsLoading(true);
    // } else {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 1000);
    // }
    function timeOut(callback: () => void) {
      return setTimeout(() => {
        callback();
      }, 1000);
    }

    if (globalLoading) {
      setIsLoading(true);
    } else {
      timeOut(() => setIsLoading(false));
    }
    return () => clearTimeout(timeOut(() => setIsLoading(false)));
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};
export default GlobalLoading;
