import responseHandler from "../handlers/response.handler.js";
import tmdbApis from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const {
      params: { personId },
    } = req;

    const person = await tmdbApis.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const {
      params: { personId },
    } = req;

    const media = await tmdbApis.personMedias({ personId });

    responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
