import express from "express";
import { body } from "express-validator";
import reviewController from "../controller/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

/**
 * @argument mergeParams express.Router()를 사용할 때 부모 라우터의 파라미터를 자식 라우터에서 사용하고자 할 때 설정하는 옵션
 * 이 옵션을 true로 설정하면 부모 라우터에[서 정의한 파라미터를 자식 라우터에서 사용할 수 있다.
 *
 * express.Router({ mergeParams: true })는 부모 라우터에서 전달받은 매개변수와 현재 라우터에서 정의한 매개변수를 모두 사용할 수 있도록 설정하는 옵션입니다. 이 경우, :userId라는 매개변수가 상위 라우터에서 정의되었기 때문에 mergeParams: true를 설정하여 하위 라우터에서도 사용할 수 있도록 합니다.

 * 부모 라우터에서 /:id와 같이 파라미터를 정의하고,
 * 자식 라우터에서 /:subId와 같이 또 다른 파라미터를 정의한 경우,
 * mergeParams를 true로 설정하지 않으면 자식 라우터에서는 부모 라우터에서 정의한 :id 파라미터를 사용할 수 없습니다.
 * 그러나 mergeParams를 true로 설정하면 자식 라우터에서도 부모 라우터에서 정의한 :id 파라미터를 사용할 수 있습니다.
 */
const router = express.Router({ mergeParams: true });

/**
 * GET /reviews 요청을 받으면 tokenMiddleware.auth 미들웨어를 실행한 후 reviewController.getReviewsOfUser 함수를 실행하여 해당 유저의 모든 리뷰를 가져옵니다.
 */
router.get("/", tokenMiddleware.auth, reviewController.getReviewOfUser);

/**
 * POST /reviews 요청을 받으면 tokenMiddleware.auth 미들웨어를 실행한 후, 요청 바디의 mediaId, content, mediaType, mediaTitle, mediaPoster 프로퍼티들을 express-validator 패키지를 사용하여 검증합니다. 검증이 실패하면 requestHandler.validate 미들웨어에서 에러를 핸들링합니다. 검증이 성공하면 reviewController.create 함수를 실행하여 새로운 리뷰를 생성합니다.
 */
router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content can not be empty"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  requestHandler.validate,
  reviewController.create
);

/**
 * DELETE /reviews/:reviewId 요청을 받으면 tokenMiddleware.auth 미들웨어를 실행한 후, reviewId에 해당하는 리뷰를 reviewController.remove 함수를 실행하여 삭제합니다.
 */
router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

export default router;
