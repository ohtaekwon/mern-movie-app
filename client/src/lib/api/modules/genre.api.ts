import publicClient from "../client/public.client";
import { handleError } from "../utils/helpers";

const genreApiRoutes = {
  list: ({ mediaType }: { mediaType: "tv" | "movie" }) => `${mediaType}/genres`,
};

const genreApis = {
  getList: async ({ mediaType }: { mediaType: "tv" | "movie" }) => {
    try {
      const response = await publicClient.get(
        genreApiRoutes.list({ mediaType })
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};

export default genreApis;
