import React from "react";

import useMultipleState from "hooks/useMultipleState";
import personApis from "lib/api/modules/person.api";
import tmdbConfig from "lib/api/config/tmdb.config";

import { toast } from "react-toastify";
import { Button, Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const STATE_NAMES = {
  medias: "medias",
  filteredMedias: "filteredMedias",
  page: "page",
} as const;

const PersonMediaGrid = ({ personId }: { personId: string }) => {
  const [{ medias, filteredMedias, page }, setMediaState] = useMultipleState({
    medias: [],
    filteredMedias: [],
    page: 1,
  });
  const skip = 8;

  React.useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await personApis.medias({ personId });

      if (error) toast.error(error.message);
      if (response) {
        const mediasSorted = (response as any).cast.sort(
          (a: any, b: any) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMediaState({ name: STATE_NAMES.medias, value: [...mediasSorted] });
        setMediaState({
          name: STATE_NAMES.filteredMedias,
          value: [...mediasSorted].splice(0, skip),
        });
      }
    };
    getMedias();
  }, [personId]);

  const getReleaseDate = (media: any) => {
    const date =
      media.media_type === tmdbConfig.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setMediaState({
      name: STATE_NAMES.filteredMedias,
      value: [...filteredMedias, ...[...medias].splice(page * skip, skip)],
    });
    setMediaState({ name: STATE_NAMES.page, value: page + 1 });
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media: any, index: number) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore}>더보기</Button>
      )}
    </>
  );
};

export default PersonMediaGrid;
