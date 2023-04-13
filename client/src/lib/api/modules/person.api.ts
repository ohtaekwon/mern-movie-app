import publicClient from "../client/public.client";
import { handleError } from "../utils/helpers";

const personApiRoutes = {
  detail: ({ personId }: { personId: string }) => `person/${personId}`,
  medias: ({ personId }: { personId: string }) => `person/${personId}/medias`,
};

const personApis = {
  detail: async ({ personId }: { personId: string }) => {
    try {
      const response = await publicClient.get(
        personApiRoutes.detail({ personId })
      );

      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  medias: async ({ personId }: { personId: string }) => {
    try {
      const response = await publicClient.get(
        personApiRoutes.medias({ personId })
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};

export default personApis;
