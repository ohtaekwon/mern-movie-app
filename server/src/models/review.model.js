import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

/**
 * @description mongoose 패키지를 사용하여 MongoDB 데이터베이스의 Review 스키마를 정의하고 모델로 컴파일합니다.
 * modelOptions 객체는 스키마에 적용될 옵션을 정의합니다.
 *
 * @argument Review 스키마는 사용자 ID, 콘텐츠, 미디어 유형, 미디어 ID, 미디어 제목, 미디어 포스터 필드를 가집니다.
 * 이 필드들은 각각 Schema.Types.ObjectId, String, String, String, String, String 유형으로 정의되어 있습니다.
 * Review 모델은 User 모델과의 관계를 나타내기 위해 User 모델의 ObjectId를 참조하는 user 필드를 가집니다.
 *
 * mongoose.Schema() 함수에 전달되는 두 번째 매개변수로 modelOptions 객체가 전달되어 스키마의 옵션을 설정합니다.
 * 이 객체는 toJSON 및 toObject 함수가 실행될 때 모델의 가상 필드를 포함하고, versionKey를 false로 설정하고,
 * timestamps를 true로 설정하여 생성 일시 및 수정 일시를 저장할 수 있도록 합니다.
 */

export default mongoose.model(
  // Review 모델을 정의
  "Review",
  // Review 스키마 정의
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
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
    },
    modelOptions
  )
);
