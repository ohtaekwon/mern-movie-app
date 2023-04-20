import React from "react";
import { Props } from "./MediaSlide.type";
import mediaApis from "lib/api/modules/media.api";
import { toast } from "react-toastify";
import { MediaType } from "types/index.types";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";

const MediaSlide = ({
  mediaType,
  mediaCategory,
}: React.PropsWithChildren<Props>) => {
  const [medias, setMedias] = React.useState<MediaType[]>([]);

  React.useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApis.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);
      if (error) toast.error(error.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
