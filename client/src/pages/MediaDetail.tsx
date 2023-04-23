import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { addFavorite } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";

import useMultipleState from "hooks/useMultipleState";
import tmdbConfig from "lib/api/config/tmdb.config";
import favoriteApis from "lib/api/modules/favorite.api";
import mediaApis from "lib/api/modules/media.api";
import uiConfigs from "configs/ui.config";

import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import ImageHeader from "components/ImageHeader";
import CircularRate from "components/CircularRate";
import Container from "components/Container";
import PosterSlide from "components/PosterSlide";
import BackdropSlide from "components/BackdropSlide";
import RecommendSlide from "components/RecommendSlide";
import MediaSlide from "components/MediaSlide";
import publicClient from "lib/api/client/public.client";
import axios from "axios";
import MediaReview from "components/MediaReview";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams<{
    mediaType: "tv" | "movie";
    mediaId: string;
  }>();
  const { user, listFavorites } = useSelector((state: RootState) => state.user);
  const { globalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const dispatch = useDispatch();

  const [detailState, setDetailState] = useMultipleState({
    media: [],
    isFavorite: false,
    onRequest: false,
    genres: [],
  });

  const videoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // left top
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      if (!mediaType || !mediaId) return;

      const { response, error } = await mediaApis.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setDetailState({
          name: "media",
          value: response,
        });
        setDetailState({
          name: "isFavorite",
          value: response.isFavorite,
        });
        setDetailState({
          name: "genres",
          value: response.genres.splice(0, 2),
        });
      }
      if (error) toast.error(error.message);
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (detailState.onRequest) return;

    if (detailState.isFavorite) {
      //
      return;
    }
    setDetailState({
      name: "onRequest",
      value: true,
    });

    const body = {
      mediaId: detailState.media.id as number,
      mediaTitle: (detailState.media.title || detailState.media.name) as string,
      mediaType: mediaType!,
      mediaPoster: detailState.media.poster_path as string,
      mediaRate: detailState.media.vote_average as number,
    };

    const { response, error } = await favoriteApis.add(body);

    setDetailState({
      name: "onRequest",
      value: false,
    });

    if (error) toast.error(error.message);
    if (response) {
      setDetailState({
        name: "isFavorite",
        value: true,
      });
      toast.success("좋아하기 추가를 성공하였습니다.");
      // dispatch(addFavorite())
    }
  };

  const onRemoveFavorite = async () => {
    if (detailState.onRequest) return;
    setDetailState({
      name: "onRequest",
      value: true,
    });

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === detailState.media.id.toString()
    );
    if (!favorite) return;

    const { response, error } = await favoriteApis.remove({
      favoriteId: favorite.mediaId,
    });

    setDetailState({
      name: "onRequest",
      value: false,
    });

    if (error) toast.error(error.message);
    if (response) {
      toast.success("좋아하기 취소를 성공하였습니다.");
    }
  };

  console.log(detailState.media);

  return detailState.media ? (
    <>
      {/* be in a backdrop_path or poster_path  */}
      {detailState.media.backdrop_path && (
        <ImageHeader
          imgPath={tmdbConfig.backdropPath(detailState.media.backdrop_path)}
        />
      )}
      {/* {detailState.media.poster_path && (
        <ImageHeader
          imgPath={tmdbConfig.backdropPath(detailState.media.poster_path)}
        />
      )} */}
      {/* be in a backdrop_path or poster_path  */}

      <Box
        sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}
      >
        {/* media content */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-30rem" } }}>
          <Box
            sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              {/* be in a backdrop_path or poster_path  */}

              {detailState.media.poster_path && (
                <Box
                  sx={{
                    paddingTop: "140%",
                    ...uiConfigs.style.backgroundImage(
                      tmdbConfig.posterPath(detailState.media.poster_path)
                    ),
                  }}
                />
              )}
              {/* 
              {detailState.media.backdrop_path && (
                <Box
                  sx={{
                    paddingTop: "140%",
                    ...uiConfigs.style.backgroundImage(
                      tmdbConfig.posterPath(detailState.media.backdrop_path)
                    ),
                  }}
                />
              )} */}
              {/* be in a backdrop_path or poster_path  */}
            </Box>
            {/* poster */}
          </Box>
          {/* media info */}
          <Box sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}>
            <Stack spacing={5}>
              {/* title */}
              <Typography
                variant="h4"
                fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
              >
                {`${detailState.media.title || detailState.media.name} ${
                  mediaType === tmdbConfig.mediaType.movie
                    ? detailState.media.release_date?.split("-")[0]
                    : detailState.media.first_air_date?.split("-")[0]
                }`}
              </Typography>
              {/* title */}
              {/* rate and genres */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* rate */}
                <CircularRate value={detailState.media.vote_average} />
                {/* rate */}
                <Divider orientation="vertical" />
                {/* genres */}
                {detailState.genres.map(
                  (
                    { id, name }: { id: number; name: string },
                    index: number
                  ) => (
                    <Chip
                      label={name}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  )
                )}
                {/* genres */}
              </Stack>
              {/* rate and genres */}

              {/* overview */}
              <Typography
                variant="body1"
                sx={{ ...uiConfigs.style.typoLines(5) }}
              >
                {detailState.media.overview}
              </Typography>
              {/* overview */}

              {/* buttons */}
              <Stack direction="row" spacing={1}>
                <LoadingButton
                  variant="text"
                  sx={{
                    width: "max-content",
                    "& .MuiButon-starIcon": { marginRight: "0" },
                  }}
                  size="large"
                  startIcon={
                    detailState.isFavorite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )
                  }
                  loadingPosition="start"
                  loading={detailState.onRequest}
                  onClick={onFavoriteClick}
                />
                <Button
                  variant="contained"
                  sx={{ width: "max-content" }}
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => videoRef.current?.scrollIntoView()}
                >
                  시청하기
                </Button>
              </Stack>
              {/* buttons */}

              {/* cast */}
              <Container header="Cast">
                {/* <CastSlide casts={detailState.media.credits.cast} /> */}
              </Container>
              {/* cast */}
            </Stack>
          </Box>
          {/* media info */}
        </Box>
        {/* media content */}

        {/* media videos */}
        <div ref={videoRef}>
          <Container header="Videos"></Container>
        </div>
        {/* media videos */}

        {/* media backdrop */}
        {detailState.media.images?.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={detailState.media.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {detailState.media.images?.posters?.length > 0 && (
          <Container header="poster">
            <PosterSlide posters={detailState.media.images.posters} />
          </Container>
        )}
        {/* media poster */}

        {/* media reviews */}
        {/* 
        <MediaReview
          media={detailState.media}
          reviews={detailState.media.reviews}
          mediaType={"movie"}
        /> */}

        {/* media reviews */}

        {/* media recommendation */}
        <Container header="추천 영화">
          {detailState.media.recommend?.length > 0 && (
            <RecommendSlide
              medias={detailState.media.recommend}
              mediaType={mediaType!}
            />
          )}
          {detailState.media.recommend?.length === 0 && (
            <MediaSlide
              mediaType={mediaType!}
              mediaCategory={tmdbConfig.mediaCategory.top_rated}
            />
          )}
        </Container>
        {/* media recommendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
