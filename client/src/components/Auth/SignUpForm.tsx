import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import userApis from "lib/api/modules/user.api";
import { setUser } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  switchAuthState: () => void;
}

const SignUpForm: React.FC<Props> = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoadingRequest, setIsLoadingRequest] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(8, "이름은 최소 8글자 이상입니다.")
        .required("이름은 필수입니다."),
      displayName: Yup.string()
        .min(1, "이름은 1글자 이상 8글자 이하이여야 합니다.")
        .required("이름은 필수 사항입니다."),
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
            placeholder="email을 작성해주세요."
            name="email"
            fullWidth
            value={signUpForm.values.email}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.email && signUpForm.errors.email !== undefined
            }
            helperText={signUpForm.touched.email && signUpForm.errors.email}
          />
          <TextField
            type="text"
            placeholder="이름을 입력해주세요."
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
            placeholder="비밀번호를 입력해주세요."
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
            placeholder="비밀번호를 확인을 위해 다시 입력해주세요."
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
