const favoriteUtils = {
  check: ({ listFavorites, mediaId }: CheckType) =>
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};
export default favoriteUtils;

type CheckType = {
  listFavorites: { mediaId: number }[];
  mediaId: number;
};
