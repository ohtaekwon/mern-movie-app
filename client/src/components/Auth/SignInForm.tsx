import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApis from "lib/api/modules/user.api";
import { setUser } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { toast } from "react-toastify";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  switchAuthState: () => void;
}

const SignInForm: React.FC<Props> = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLogInRequest] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  /**
   * formik : from control하는 라이러브러이다.
   * useFormik을 활용해 변수에 담아서 사용하며, formik 구조와 config를 설정하는 formik객체를 만들어낸다.
   * touched : Formik이 터치하는 곳
   */
  const signInForm = useFormik({
    // 설정할 초기값
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(8, "아이디는 최소 8글자 이상")
        .required("유저 이름은 필수입니다."),
      password: Yup.string()
        .min(8, "비밀번호는 8글자 이상입니다.")
        .required("비밀번호는 필수입니다."),
    }),
    // 제출시 처리할 함수. 인자로 value객체를 가져와 조건에 맞게 활용한다.
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLogInRequest(true);
      console.log("loading...");
      const { response, error } = await userApis.signIn(values);
      setIsLogInRequest(false);

      if (response) {
        signInForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("로그인을 성공하였습니다.");
      }

      if (error) setErrorMessage(error.message);
    },
    // 값 변경시마다 validation 체크
    // validateOnChange:true,

    // 인풋창 블러시에 validation 체크
    // validateOnBlur: true,

    // validation 체크할 함수
    // validate: validator,
  });

  return (
    <>
      <Box component="form" onSubmit={signInForm.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="text"
            placeholder="email을 입력해주세요,"
            name="email"
            fullWidth
            value={signInForm.values.email}
            onChange={signInForm.handleChange}
            color="success"
            error={
              signInForm.touched.email && signInForm.errors.email !== undefined
            }
            helperText={signInForm.touched.email && signInForm.errors.email}
          />
          <TextField
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            fullWidth
            value={signInForm.values.password}
            onChange={signInForm.handleChange}
            color="success"
            error={
              signInForm.touched.password &&
              signInForm.errors.password !== undefined
            }
            helperText={
              signInForm.touched.password && signInForm.errors.password
            }
          />
        </Stack>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}
        >
          Sign In
        </LoadingButton>

        <Button
          fullWidth
          sx={{ marginTop: 1 }}
          onClick={() => switchAuthState()}
        >
          Sign Up
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
export default SignInForm;
