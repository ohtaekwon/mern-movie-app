import React from "react";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { totalMediaProps } from "types/index.types";

const RecommendSlide = ({
  medias,
  mediaType,
}: {
  medias: totalMediaProps[];
  mediaType: "tv" | "movie";
}) => {
  return (
    <AutoSwiper>
      {medias.map((media: totalMediaProps, index: number) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
