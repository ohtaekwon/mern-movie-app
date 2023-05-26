import express from "express";
import { body } from "express-validator";
import favoriteController from "../controller/favorite.controller.js";
import userController from "../controller/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

/**
 * @description express의 body 메서드는 유효성 검사를 위한 API이며, 필드에 대해서 검증을 수행하며, 체이닝 방식으로 검증 규칙들을 추가할 수 있다.
 * @method exists 검증 대상 필드의 값이 존재하는지 확인한다. 존재하지 않으면 실패 처리로 오류를 return
 * @method withMessage 메시지 전달
 * @method isLength 길이 검증
 * @method custom 검증이 끝난 후에 동작할 메서드 custom
 *
 */

const router = express.Router();

/**
 * @description "/signup" 경로로 POST요청 시 사용자 등록(sign-up)기능을 수행하는 함수
 * @body username : 필수값이며, 최소 8자 이상이어야 하며, 이미 존재하는 사용자인지 검증합니다.
 * @body password : 필수값이며, 최소 8자 이상이어야 합니다.
 * @body confirmPassword : 필수값이며, 최소 8자 이상이어야 하며, password 필드와 같은 값인지 검증합니다.
 * @body displayName : 필수값이며, 최소 8자 이상이어야 합니다.
 */
router.post(
  "/signup", // 리소스
  // body("필드", "메시지") 검증 API로 body는 req.body에서 오는 값만 검사한다.
  body("email")
    .exists()
    .withMessage("email is required")
    .isLength({ min: 8 })
    .withMessage("email minimum 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already used");
    }),
  body("displayName")
    .exists()
    .withMessage("displayName is required")
    .isLength({ min: 1 })
    .withMessage("displayName minimum 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirmPassword not match");
      }
      return true;
    }),
  requestHandler.validate, // Request자체 검증 미들웨어
  userController.signUp
);

/**
 * @body
 * @body
 * @body
 * @body
 */

router.post(
  "/signin",
  body("email")
    .exists()
    .withMessage("email is required")
    .isLength({ min: 8 })
    .withMessage("email is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  requestHandler.validate,
  userController.signIn
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("newPassword minimum 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmNewPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("confirmNewPassword not match");
      }
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);
export default router;
