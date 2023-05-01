import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useMultipleState from "hooks/useMultipleState";
import usePrevious from "hooks/usePrevious";
import { setAppState } from "redux/features/appStateSlice";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import mediaApis from "lib/api/modules/media.api";
import { toast } from "react-toastify";
import HeroSlide from "components/HeroSlide";
import tmdbConfig from "lib/api/config/tmdb.config";
import MediaGrid from "components/MediaGrid";
import uiConfigs from "configs/ui.config";

enum STATE_NAMES {
  medias = "medias",
  mediaLoading = "mediaLoading",
  currentCategory = "currentCategory",
  currentPage = "currentPage",
}

export default function MediaList() {
  const { mediaType } = useParams<{ mediaType: "movie" | "tv" }>(); // Parameters info

  const [
    { medias, mediaLoading, currentCategory, currentPage },
    setMediaState,
  ] = useMultipleState({
    medias: [],
    mediaLoading: false,
    currentCategory: 0,
    currentPage: 1,
  });

  const prevMediaType = usePrevious(mediaType!);
  const dispatch = useDispatch();

  /**
   * @description 연산을 정의하는 함수이며 두 번쨰 파라미터(deps)에 배열을 넣어주고, deps의 내용이 바뀌면 등록한 함수를 호출한다. 만약 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용한다.
   * @returns one of ["popular", "top_rated"]
   */
  const mediaCategories = React.useMemo(() => ["popular", "top_rated"], []) as [
    "popular",
    "top_rated"
  ];
  const category = ["popular", "top_rated"];

  React.useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  React.useEffect(() => {
    const getMedias = async () => {
      if (currentPage === 1) dispatch(setGlobalLoading(true));
      setMediaState({
        name: STATE_NAMES.mediaLoading,
        value: true,
      });

      const { response, error } = await mediaApis.getList({
        mediaType: mediaType!,
        mediaCategory: mediaCategories[currentCategory],
        page: currentPage,
      });

      setMediaState({
        name: STATE_NAMES.mediaLoading,
        value: false,
      });
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        if (currentPage !== 1) {
          setMediaState({
            name: STATE_NAMES.medias,
            value: [...medias, ...response.results],
          });
        } else {
          setMediaState({
            name: STATE_NAMES.medias,
            value: [...response.results],
          });
        }
      }
    };

    if (mediaType !== prevMediaType) {
      setMediaState({
        name: STATE_NAMES.currentCategory,
        value: 0,
      });
      setMediaState({
        name: STATE_NAMES.currentPage,
        value: 1,
      });
    }

    getMedias();
  }, [
    mediaType,
    currentCategory,
    prevMediaType,
    currentPage,
    mediaCategories,
    dispatch,
  ]);

  const onCategoryChange = (categoryIndex: number) => {
    if (currentCategory === categoryIndex) return;
    setMediaState({
      name: STATE_NAMES.medias,
      value: [],
    });
    setMediaState({
      name: STATE_NAMES.currentPage,
      value: 1,
    });
    setMediaState({
      name: STATE_NAMES.currentCategory,
      value: categoryIndex,
    });
  };

  const onLoadMore = () =>
    setMediaState({
      name: STATE_NAMES.currentPage,
      value: currentPage + 1,
    });

  return (
    <>
      <HeroSlide
        mediaType={mediaType!}
        mediaCategory={mediaCategories[currentCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfig.mediaType.movie ? "영화" : "TV 시리즈"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currentCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currentCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType!} />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          더보기
        </LoadingButton>
      </Box>
    </>
  );
}
