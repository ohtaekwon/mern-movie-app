import React from "react";
import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";
import { totalMediaProps } from "types/index.types";

const MediaGrid = ({
  medias,
  mediaType,
}: {
  medias: totalMediaProps[];
  mediaType: "movie" | "tv" | "people";
}) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {medias.map((media: totalMediaProps, index: number) => (
        <Grid key={index} item xs={6} sm={4} md={3}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;
