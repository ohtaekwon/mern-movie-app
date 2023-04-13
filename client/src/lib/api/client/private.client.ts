import axios from "axios";
import querytring from "query-string";

const basePath = "http://127.0.0.1:8000/api/v1/";

const privateClient = axios.create({
  baseURL: basePath,
  // paramsSerializer는 params를 직렬화하는 옵션 함수
  paramsSerializer: {
    encode: (params) => querytring.stringify(params),
  },
});

/**
 1. 요청 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
privateClient.interceptors.request.use(
  async (config) => {
    const headers = {
      "Content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
    };
    return {
      ...config,
      ...headers,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
privateClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적으로 처리된 경우
    if (response && response.data) {
      console.info("응답을 받았습니다.");
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateClient;
