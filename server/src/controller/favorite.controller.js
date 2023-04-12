import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

/**
 * @description 유저의 favorite 추가하는 Controller
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addFavorite = async (req, res) => {
  try {
    const {
      user: { id },
      body: { mediaId },
    } = req;

    const isFavorite = await favoriteModel.findOne({
      user: id,
      mediaId: mediaId,
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...body,
      user: id,
    });
    await favorite.save();
    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};
/**
 * @description 유저의 favorite 삭제하는 Controller
 * @param {*} req
 * @param {*} res
 * @returns
 */
const removeFavorite = async (req, res) => {
  try {
    const {
      params: { favoriteId },
      user: { id },
    } = req;

    const favorite = await favoriteModel.findOne({
      user: id,
      _id: favoriteId,
    });

    if (!favorite) return responseHandler.notFound(res);

    await favorite.remove();
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};
/**
 * @description 유저의 favorites GET하는 Controller
 * @param {*} req
 * @param {*} res
 */
const getFavoritesOfUser = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const favorite = await favoriteModel.find({ user: id }).sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};
export default { addFavorite, removeFavorite, getFavoritesOfUser };
