import React from "react";
import { Modal, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { setAuthModalOpen } from "redux/features/authModalSlice";

import Logo from "components/Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const actionState = {
  signin: "signin",
  signup: "signup",
} as const;

const AuthModal = () => {
  /**
   * useSelector Hooks를 이용해 store에 저장된 state를 가져오고,
   * useDispatch를 사용해 변경할 값을 reducer에 전달
   */
  const { authModalOpen } = useSelector((state: RootState) => state.authModal);
  const dispatch = useDispatch();

  const [action, setAction] = React.useState<"signin" | "signup">(
    actionState.signin
  );

  React.useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state: "signin" | "signup") =>
    setAction(actionState[state]);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>
          {action === actionState.signin && (
            <SignInForm
              switchAuthState={() => switchAuthState(actionState.signup)}
            />
          )}
          {action === actionState.signup && (
            <SignUpForm
              switchAuthState={() => switchAuthState(actionState.signin)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
export default AuthModal;
