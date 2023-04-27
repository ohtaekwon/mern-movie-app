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
import MediaReview from "components/MediaReview";
import MediaVideoSlide from "components/MediaVideoSlide";
import CastSlide from "components/CastSlide";

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

  const [{ media, isFavorite, onRequest, genres }, setDetailState] =
    useMultipleState({
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

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }
    setDetailState({
      name: "onRequest",
      value: true,
    });

    const body = {
      mediaId: media.id as number,
      mediaTitle: (media.title || media.name) as string,
      mediaType: mediaType!,
      mediaPoster: media.poster_path as string,
      mediaRate: media.vote_average as number,
    };

    const { response, error } = await favoriteApis.add(body);

    setDetailState({
      name: "onRequest",
      value: false,
    });

    if (error) toast.error(error.message);
    if (response) {
      dispatch(addFavorite(response));

      setDetailState({
        name: "isFavorite",
        value: true,
      });
      toast.success("좋아하기 추가를 성공하였습니다.");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setDetailState({
      name: "onRequest",
      value: true,
    });

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
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

  return media ? (
    <>
      {/* 배경 이미지  */}
      {media.backdrop_path && (
        <ImageHeader imgPath={tmdbConfig.backdropPath(media.backdrop_path)} />
      )}
      {/* {media.poster_path && (
        <ImageHeader
          imgPath={tmdbConfig.backdropPath(media.poster_path)}
        />
      )} */}
      {/* 배경 이미지  */}

      <Box
        sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}
      >
        {/* 미디어 컨텐츠 */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-30rem" } }}>
          <Box
            sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
          >
            {/* 영화 포스터 */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              {/* be in a backdrop_path or poster_path  */}
              {media.poster_path && (
                <Box
                  sx={{
                    paddingTop: "140%",
                    ...uiConfigs.style.backgroundImage(
                      tmdbConfig.posterPath(media.poster_path)
                    ),
                  }}
                />
              )}
              {/* 
              {media.backdrop_path && (
                <Box
                  sx={{
                    paddingTop: "140%",
                    ...uiConfigs.style.backgroundImage(
                      tmdbConfig.posterPath(media.backdrop_path)
                    ),
                  }}
                />
              )} */}
              {/* be in a backdrop_path or poster_path  */}
            </Box>
            {/* 영화 포스터 */}

            {/* 미디어 정보 */}
            <Box
              sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}
            >
              <Stack spacing={5}>
                {/* 영화 제목 */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfig.mediaType.movie
                      ? media.release_date?.split("-")[0]
                      : media.first_air_date?.split("-")[0]
                  }`}
                </Typography>
                {/* 영화 제목 */}

                {/* 점수, 장르 */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* 점수 */}
                  <CircularRate value={media.vote_average} />
                  {/* 점수 */}
                  <Divider orientation="vertical" />
                  {/* 장르 */}
                  {genres.map(
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
                  {/* 장르 */}
                </Stack>
                {/* 점수, 장르 */}

                {/* 줄거리 */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* 줄거리 */}

                {/* 버튼 - 좋아요, 시청하기 */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
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
                {/* 버튼 - 좋아요, 시청하기  */}

                {/* 출연 배우 */}
                <Container header="출연 배우">
                  <CastSlide casts={media.credits?.cast} />
                </Container>
                {/* 출연 배우 */}
              </Stack>
            </Box>
            {/* 미디어 정보 */}
          </Box>
        </Box>
        {/* 미디어 컨텐츠 */}

        {/* 미디어 비디오 */}
        {media.videos?.results.length > 0 && (
          <div ref={videoRef}>
            <Container header="비디오">
              <MediaVideoSlide videos={media.videos?.results.splice(0, 5)} />
            </Container>
          </div>
        )}
        {/* 미디어 비디오 */}

        {/* media backdrop */}
        {media.images?.backdrops.length > 0 && (
          <Container header="배경 사진">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* 미디어 포스터 */}
        {media.images?.posters?.length > 0 && (
          <Container header="포스터">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}
        {/* 미디어 포스터 */}

        {/* media reviews */}
        <MediaReview
          media={media}
          reviews={media.reviews}
          mediaType={"movie"}
        />
        {/* media reviews */}

        {/* 추천 미디어 */}
        <Container header="추천 영상">
          {media.recommend?.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType!} />
          )}
          {media.recommend?.length === 0 && (
            <MediaSlide
              mediaType={mediaType!}
              mediaCategory={tmdbConfig.mediaCategory.top_rated}
            />
          )}
        </Container>
        {/* 추천 미디어 */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
