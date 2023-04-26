const baseUrl = `${process.env.TMDB_BASE_URL}/${process.env.TMDB_VERSION}`;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, param) => {
  const qs = new URLSearchParams(param); // URL 쿼리 문자열을 쓰는데 사용

  return `${baseUrl}/${endpoint}?api_key=${key}&${qs}&include_image_language="kr,en,null`;
};

export default { getUrl };
