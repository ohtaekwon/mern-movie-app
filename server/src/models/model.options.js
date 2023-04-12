/**
 * @description  Mongoose 모듈에서 제공하는 Schema options로 Schema가 생성되고 나서 이를 가지고 model을 만들 때 설정값을 지정하는데 사용됩니다.
 * @description Schema options을 하나의 객체로 정의
 *
 * @argument toJSON true로 설정하면, JSON으로 변환할 때 virtual fields가 포함됩니다. transform 함수는 JSON 변환 과정에서 호출되며, _id 필드를 제외한 객체를 반환합니다.
 * @argument toObject true로 설정하면, toJSON과 동일하게 동작합니다. Mongoose에서는 이를 명시적으로 설정하지 않을 경우 기본값으로 toJSON을 사용합니다.
 * @argument versionKey false로 설정하면, 저장되는 도큐먼트에 버전 키를 추가하지 않습니다. 기본값은 true입니다.
 * @argument timestamps true로 설정하면, createdAt과 updatedAt 필드가 자동으로 생성됩니다. 기본값은 false입니다.
 *
 */

const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      // ID 필드 제외
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      // ID 필드 제외
      delete obj._id;
      return obj;
    },
  },
  versionKey: false,
  timestamps: true,
};
export default modelOptions;
