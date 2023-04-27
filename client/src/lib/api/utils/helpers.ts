import axios, { AxiosError } from "axios";

export type ApiError = {
  code: number;
  message: string;
};

export const handleError = (error: unknown): ApiError => {
  let errorCode: ApiError["code"];
  let errorMsg: ApiError["message"];

  if (axios.isAxiosError(error)) {
    const { message, response } = error as AxiosError;
    errorMsg = message;
    errorCode = response ? response.status : 500;
  } else {
    console.error(error);
    errorMsg = "예상치 못한 에러입니다.";
    errorCode = 500;
  }
  console.error("응답에서 에러가 발생하였습니다. : ", errorMsg);
  return { code: errorCode, message: errorMsg };
};
