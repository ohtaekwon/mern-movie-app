import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity",
    },
    params: {
      language: "ko-KR",
    },
  });
  return response.data;
};

export default { get };
