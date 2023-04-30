import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { removeFavorites } from "redux/features/userSlice";

import useMultipleState from "hooks/useMultipleState";
import favoriteApis from "lib/api/modules/favorite.api";

import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid } from "@mui/material";

import MediaItem from "components/MediaItem";
import uiConfigs from "configs/ui.config";
import Container from "components/Container";

const FavoriteItem = ({
  media,
  onRemoved,
}: {
  media: any;
  onRemoved: (id: number) => void;
}) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = React.useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await favoriteApis.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);
    if (error) toast.error(error.message);
    if (response) {
      toast.success("좋아요를 취소가 성공하였습니다.");
      dispatch(removeFavorites({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        취소하기
      </LoadingButton>
    </>
  );
};

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

  const onRemoved = (id: number) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setFavoriteState({ name: STATE_NAMES.medias, value: newMedias });
    setFavoriteState({
      name: STATE_NAMES.filteredMedias,
      value: [...newMedias].splice(0, page * skip),
    });
    setFavoriteState({ name: STATE_NAMES.count, value: count - 1 });
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`좋아요 갯수 (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media: any, index: number) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};
export default FavoriteList;
