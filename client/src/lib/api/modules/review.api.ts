import privateClient from "../client/private.client";
import { handleError } from "../utils/helpers";

const reviewApiRoutes = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }: { reviewId: number }) => `reviews/${reviewId}`,
};

const reviewApis = {
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    content,
  }: {
    mediaId: number;
    mediaType: "movie" | "tv";
    mediaTitle: string;
    mediaPoster: string;
    content: string;
  }) => {
    try {
      const response = await privateClient.post(reviewApiRoutes.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  remove: async ({ reviewId }: { reviewId: number }) => {
    try {
      const response = await privateClient.delete(
        reviewApiRoutes.remove({ reviewId })
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  getList: async () => {
    try {
      const response: any = await privateClient.get(reviewApiRoutes.list);
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};
export default reviewApis;
