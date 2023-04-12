const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "something is wrong..",
  });

const badRequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unauthorize = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "인증이 되지 않았습니다.",
  });

const notFound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource를 찾지 못했습니다.",
  });

export default {
  error,
  badRequest,
  ok,
  created,
  unauthorize,
  notFound,
};
