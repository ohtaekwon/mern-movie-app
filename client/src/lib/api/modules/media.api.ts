import publicClient from "../client/public.client";
import privateClient from "../client/private.client";
import { handleError } from "../utils/helpers";

const mediaApiRoutes = {
  list: ({
    mediaType,
    mediaCategory,
    page,
  }: {
    mediaType: "movie" | "tv" | "people";
    mediaCategory: string;
    page: string;
  }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({
    mediaType,
    mediaId,
  }: {
    mediaType: "movie" | "tv" | "people";
    mediaId: string;
  }) => `${mediaType}/detail/${mediaId}`,
  search: ({
    mediaType,
    query,
    page,
  }: {
    mediaType: "movie" | "tv" | "people";
    query: string;
    page: string;
  }) => `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApis = {
  getList: async ({
    mediaType,
    mediaCategory,
    page,
  }: {
    mediaType: "movie" | "tv" | "people";
    mediaCategory: string;
    page: string;
  }) => {
    try {
      const response = await publicClient.get(
        mediaApiRoutes.list({
          mediaType,
          mediaCategory,
          page,
        })
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  getDetail: async ({
    mediaType,
    mediaId,
  }: {
    mediaType: "movie" | "tv" | "people";
    mediaId: string;
  }) => {
    try {
      const response = await privateClient.get(
        mediaApiRoutes.detail({ mediaId, mediaType })
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  search: async ({
    mediaType,
    query,
    page,
  }: {
    mediaType: "movie" | "tv" | "people";
    query: string;
    page: string;
  }) => {
    try {
      const response = await publicClient.get(
        mediaApiRoutes.search({ mediaType, query, page })
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};
export default mediaApis;
