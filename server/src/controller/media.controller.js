import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const getList = async (req, res) => {
  try {
    const {
      query: { page },
      params: { mediaType, mediaCategory },
    } = req;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const {
      params: { mediaType },
    } = req;
    const response = await tmdbApi.mediaGenres({ mediaType });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const {
      params: { mediaType },
      query: { query, page },
    } = req;
    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const {
      params: { mediaType, mediaId },
    } = req;
    const media = await tmdbApi.mediaDetail({ mediaType, mediaId });

    media.credits = await tmdbApi.mediaCredits({ mediaType, mediaId });

    const videos = await tmdbApi.mediaVideos({ mediaType, mediaId });

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend({ mediaType, mediaId });

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages({ mediaType, mediaId });

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");
    responseHandler.ok(res, media);
  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };
