import React from "react";

import { Box, Button, Grid } from "@mui/material";
import useMultipleState from "hooks/useMultipleState";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import favoriteApis from "lib/api/modules/favorite.api";
import { toast } from "react-toastify";

// const STATE_NAMES = {
//   medias: "medias",
//   filteredMedias: "filteredMedias",
//   page: "page",
//   count: "count",
// } as const;

enum STATE_NAMES {
  medias = "medias",
  filteredMedias = "filteredMedias",
  page = "page",
  count = "count",
}

const FavoriteList = () => {
  const [{ medias, filteredMedias, page, count }, setFavoriteState] =
    useMultipleState({
      medias: [],
      filteredMedias: [],
      page: 1,
      count: 0,
    });

  const dispatch = useDispatch();
  const skip = 8;

  React.useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApis.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        setFavoriteState({ name: STATE_NAMES.count, value: response.length });
        setFavoriteState({ name: STATE_NAMES.medias, value: [...response] });
        setFavoriteState({
          name: STATE_NAMES.filteredMedias,
          value: [...response].splice(0, skip),
        });
      }
    };
    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFavoriteState({
      name: STATE_NAMES.filteredMedias,
      value: [...filteredMedias, ...[...medias].splice(page * skip, skip)],
    });
    setFavoriteState({ name: STATE_NAMES.page, value: page + 1 });
  };

  return <div>FavoriteList</div>;
};
export default FavoriteList;
