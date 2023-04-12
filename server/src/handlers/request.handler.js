import { validationResult } from "express-validator";

/**
 * @description Express.js에서 유효성 검사(validation)를 수행하기 위한 미들웨어 함수
 * @param req body또는 유효성 검사를 통해 전달받은 요청(request) 객체
 * @param res 응답(response) 객체
 * @param next 결과 후 return에 따라 전달
 * @returns
 *
 * 유효성 검사 후, 에러가 발견된 경우 400 상태 코드와 에러 메시지를 포함한 JSON응답을 보낸다.
 * 이후, 에러가 발견되지 않은 경우 다음 요청을 진행
 */

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(400).json({
      message: error.array()[0].msg,
    });
  next();
};

export default { validate };
