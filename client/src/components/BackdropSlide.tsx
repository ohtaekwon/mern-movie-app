import React from "react";
import NavigationSwiper from "./NavigationSwiper";
import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import tmdbConfig from "lib/api/config/tmdb.config";

const BackdropSlide = ({ backdrops }: { backdrops: any }) => {
  console.log("backdrops", backdrops);
  return (
    <NavigationSwiper>
      {[...backdrops].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfig.backdropPath(
                item.file_path!
              )})`,
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
