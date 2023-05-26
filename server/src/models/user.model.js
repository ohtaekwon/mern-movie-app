import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

/**
 * @description 사용자의 데이터 모델 정의
 * userSchema 객체 안에 사용자 정보 정의
 * 필드 : email, displayName, password, salt(비밀번호 암호화)
 */

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    // 암호화할 때 랜덤한 값을 생성하도록
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  modelOptions
);

/**
 * @description 사용자 모델의 메서드 정의
 * @method setPassword 사용자가 입력한 비밀번호를 암호화하여 password 필드에 저장, salt필드에 랜덤한 값을 생성 후 저장
 */
userSchema.methods.setPassword = function (password) {
  /**
   * Node.js의 내장 모듈로 알고리즘을 사용하여 비밀번호 기반 키 파생을 도와주는 메서드
   * 비밀번호와 salt 값을 사용하여 지정된 반복횟수와 출력 길이에 따라 키를 반환
   */
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

/**
 * @description 사용자 모델의 메서드 정의
 * @method validPassword 입력한 비밀번호가 맞는지 검증하기 위해 password 필드를 암호화한 값과 입력한 비밀번호를 암호화한 값이 일치하는지 비교
 */
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.password === hash;
};

/**
 * @description User 모델 생성
 */
const userModel = mongoose.model("User", userSchema);

export default userModel;
