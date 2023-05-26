import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { handleError } from "../utils/helpers";

const userApiRoutes = {
  signIn: "user/signin",
  signUp: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApis = {
  signIn: async ({ email, password }: { email: string; password: string }) => {
    try {
      console.info(`로그인 요청을 보내는 중입니다.`);
      const response = await publicClient.post(userApiRoutes.signIn, {
        email,
        password,
      });
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  signUp: async ({
    email,
    password,
    confirmPassword,
    displayName,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  }) => {
    try {
      const response = await publicClient.post(userApiRoutes.signUp, {
        email,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userApiRoutes.getInfo);
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  passwordUpdate: async ({
    password,
    newPassword,
    confirmNewPassword,
  }: {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    try {
      const response = await privateClient.put(userApiRoutes.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};
export default userApis;
