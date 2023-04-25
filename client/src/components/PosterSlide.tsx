import React from "react";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import tmdbConfig from "lib/api/config/tmdb.config";
import { Poster } from "types/index.types";

const PosterSlide = ({ posters }: { posters: Poster[] }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "160%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfig.posterPath(item.file_path)})`,
            }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;
