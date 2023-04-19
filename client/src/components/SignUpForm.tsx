import React from "react";
import { Props } from "./SignUpForm.types";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import userApis from "lib/api/modules/user.api";
import { setUser } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SignUpForm = ({ switchAuthState }: React.PropsWithChildren<Props>) => {
  const dispatch = useDispatch();

  const [isLoadingRequest, setIsLoadingRequest] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const signUpForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "이름은 최소 8글자 이상입니다.")
        .required("이름은 필수입니다."),
      password: Yup.string()
        .min(8, "비밀번호는 8글자 이상입니다.")
        .required("비밀번호는 필수 입니다."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "비밀번호가 맞지 않습니다.")
        .min(8, "비밀번호는 최소 8글자 이상입니다.")
        .required("비밀번호확인은 필수 입니다."),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoadingRequest(true);
      console.log("loading...");
      const { response, error } = await userApis.signUp(values);
      console.log("response는", response);
      setIsLoadingRequest(false);

      if (response) {
        signUpForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("회원가입이 성공하였습니다.");
      }

      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <>
      <Box component="form" onSubmit={signUpForm.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="text"
            placeholder="username"
            name="username"
            fullWidth
            value={signUpForm.values.username}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.username &&
              signUpForm.errors.username !== undefined
            }
            helperText={
              signUpForm.touched.username && signUpForm.errors.username
            }
          />
          <TextField
            type="text"
            placeholder="display name"
            name="displayName"
            fullWidth
            value={signUpForm.values.displayName}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.displayName &&
              signUpForm.errors.displayName !== undefined
            }
            helperText={
              signUpForm.touched.displayName && signUpForm.errors.displayName
            }
          />
          <TextField
            type="password"
            placeholder="password"
            name="password"
            fullWidth
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.password &&
              signUpForm.errors.password !== undefined
            }
            helperText={
              signUpForm.touched.password && signUpForm.errors.password
            }
          />
          <TextField
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            fullWidth
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword !== undefined
            }
            helperText={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword
            }
          />
        </Stack>

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoadingRequest}
        >
          Sign Up
        </LoadingButton>

        <Button
          fullWidth
          sx={{ marginTop: 1 }}
          onClick={() => switchAuthState()}
        >
          Sign In
        </Button>

        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SignUpForm;
