import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import userApis from "lib/api/modules/user.api";
import { toast } from "react-toastify";
import { setUser } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import uiConfigs from "configs/ui.config";
import Container from "components/Container";

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onRequest, setOnRequest] = React.useState(false);

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "비밀번호는 8글자 이상이여야 합니다.")
        .required("비밀번호는 필수로 입력 사항 입니다."),
      newPassword: Yup.string()
        .min(8, "새 비밀번호는 8글자 이상이여야 합니다.")
        .required("새 비밀번호는 필수 입력사항입니다."),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "비빌번호가 맞지 않습니다.")
        .min(8, "비밀번호 확인은 8글자 이상이여야 합니다.")
        .required("비빌번호 확인은 필수 입력사항입니다."),
    }),
    onSubmit: async (values) => onUpdate(values),
  });

  const onUpdate = async (values: any) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, error } = await userApis.passwordUpdate(values);

    setOnRequest(false);

    if (error) toast.error(error.message);
    if (response) {
      form.resetForm(); // 초기화
      navigate("/");
      dispatch(setUser(null)); // 저장된 토큰 초기화
      dispatch(setAuthModalOpen(true)); // 로그인 모달
      toast.success("비밀번호 업데이트가 성공하였습니다. 재접속 바랍니다.");
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="new password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="password"
              placeholder="confirm new password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default PasswordUpdate;
