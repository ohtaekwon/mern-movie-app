import React from "react";

import useMultipleState from "hooks/useMultipleState";
import mediaApis from "lib/api/modules/media.api";

import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { toast } from "react-toastify";
import uiConfigs from "configs/ui.config";
import MediaGrid from "components/MediaGrid";

let timer: NodeJS.Timeout;
const timeout = 500;

/**
 * enum으로 수정
 */
const mediaTypes = ["movie", "tv", "people"] as const;
enum STATE_NAMES {
  query = "query",
  onSearch = "onSearch",
  mediaTypes = "mediaType",
  medias = "medias",
  page = "page",
}

const MediaSearch = () => {
  const [{ query, onSearch, mediaType, medias, page }, setSearchState] =
    useMultipleState({
      query: "" as string,
      onSearch: false as boolean,
      mediaType: mediaTypes[0] as "movie" | "tv" | "people",
      medias: [],
      page: 1 as number,
    });

  const search = React.useCallback(async () => {
    setSearchState({ name: STATE_NAMES.onSearch, value: true });

    const { response, error } = await mediaApis.search({
      mediaType,
      query,
      page,
    });

    setSearchState({
      name: STATE_NAMES.onSearch,
      value: false,
    });

    if (error) toast.error(error.message);
    if (response) {
      if (page > 1)
        setSearchState({
          name: STATE_NAMES.medias,
          value: [...medias, ...response.results],
        });
      else
        setSearchState({
          name: STATE_NAMES.medias,
          value: [...response.results],
        });
    }
  }, [mediaType, query, page]);

  React.useEffect(() => {
    if (query.trim().length === 0) {
      setSearchState({ name: STATE_NAMES.medias, value: [] });
      setSearchState({ name: STATE_NAMES.page, value: 1 });
    } else search();
  }, [search, query, mediaType, page]);

  /**
   * 탭설정 바꿀 시
   */
  React.useEffect(() => {
    setSearchState({ name: STATE_NAMES.medias, value: [] });
    setSearchState({ name: STATE_NAMES.page, value: 1 });
  }, [mediaType]);

  const onCategoryChange = (selectedCategory: "movie" | "tv" | "people") => {
    setSearchState({ name: STATE_NAMES.mediaTypes, value: selectedCategory });
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    /**
     * debounce
     */
    clearTimeout(timer);

    timer = setTimeout(() => {
      setSearchState({
        name: STATE_NAMES.query,
        value: newQuery,
      });
    }, timeout);
  };

  return (
    <>
      {/* <Toolbar /> */}
      <Box marginTop={30} />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color:
                    mediaType === item
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Search MoonFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() =>
                setSearchState({ name: STATE_NAMES.page, value: page + 1 })
              }
            >
              더보기
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
