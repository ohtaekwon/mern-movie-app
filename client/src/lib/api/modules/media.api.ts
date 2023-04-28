import publicClient from "../client/public.client";
import privateClient from "../client/private.client";
import { handleError } from "../utils/helpers";
import { MediaResponse } from "./index.types";

const mediaApiRoutes = {
  list: ({
    mediaType,
    mediaCategory,
    page,
  }: {
    mediaType: "movie" | "tv" | "people";
    mediaCategory: string;
    page: number;
  }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({
    mediaType,
    mediaId,
  }: {
    mediaType: "movie" | "tv";
    mediaId: string;
  }) => `${mediaType}/detail/${mediaId}`,
  search: ({
    mediaType,
    query,
    page,
  }: {
    mediaType: "movie" | "tv" | "people";
    query: string;
    page: number;
  }) => `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApis = {
  getList: async ({
    mediaType,
    mediaCategory,
    page,
  }: {
    mediaType: "movie" | "tv";
    mediaCategory: "popular" | "top_rated";
    page: number;
  }) => {
    try {
      const response: MediaResponse = await publicClient.get(
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
    mediaType: "movie" | "tv";
    mediaId: string;
  }) => {
    try {
      const response: any = await privateClient.get(
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
    page: number;
  }) => {
    try {
      const response: any = await publicClient.get(
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
