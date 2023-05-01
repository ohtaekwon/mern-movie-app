import axios from "axios";
import queryString from "query-string";

const basePath = process.env.REACT_APP_BASE_PATH;
const publicClient = axios.create({
  baseURL: basePath,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  const headers = {
    "Content-type": "application/json;charset=UTF-8",
  };
  return {
    ...config,
    ...headers,
  };
});

publicClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적으로 처리된 경우
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default publicClient;
