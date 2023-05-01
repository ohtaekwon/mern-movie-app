import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    const {
      params: { movieId },
      user: { id },
      body,
    } = req;
    const review = new reviewModel({
      user: id,
      movieId,
      ...body,
    });
    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const {
      params: { reviewId },
      user: { id },
    } = req;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: id,
    });

    if (!review) return responseHandler.notFound(res);

    await review.deleteOne();

    /**
     * @description Method change
     * 기존의 remove()에서 deleteOne()으로 수정
     */

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewOfUser = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;

    const review = await reviewModel
      .find({
        user: id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, review);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewOfUser };
