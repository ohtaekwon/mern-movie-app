import mongoose, { Schema } from "mongoose";
import modelOption from "./model.options.js";

/**
 * @description이 MongoDB 데이터베이스와 연결된 Mongoose 스키마를 생성
 * @argument Favorite 스키마는 user, mediaType, mediaId, mediaTitle, mediaPoster, mediaRate 필드로 구성되어 있습니다.
 * @argument user 필드는 Schema.Types.ObjectId 유형으로, User 모델과 연결되어 있으며, 필수 입력 항목입니다.
 * @argument mediaType 필드는 String 유형으로, "tv" 또는 "movie" 값 중 하나이며 필수 입력 항목입니다.
 * @argument mediaId  @argument mediaTitle @argument mediaPoster @argument mediaRate 필드는 각각 String, String, String, Number 유형이며 필수 입력 항목입니다.
 *
 */
export default mongoose.model(
  // Favorite 모델을 생성
  "Favorite",
  //  Favorite 스키마를 정의
  mongoose.Schema(
    {
      // mongoose의 스키마를 정의
      user: {
        type: Schema.Types.ObjectId,
        ref: "User", // User model을 참조
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
      mediaRate: {
        type: Number,
        required: true,
      },
    },
    modelOption // modelOptions을 스키마 생성 함수에 전달하여 옵션을 설정
  )
);
