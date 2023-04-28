import React from "react";
import { Box } from "@mui/material";
import tmdbConfig from "lib/api/config/tmdb.config";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import { Video } from "types/index.types";

const MediaVideo = ({ video }: { video: Video }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const newHeight = (iframeRef.current?.offsetWidth! * 9) / 16 + "px";
    iframeRef.current?.setAttribute("height", newHeight);
  }, [video]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video.key}
        src={tmdbConfig.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

const MediaVideoSlide = ({ videos }: { videos: Video[] }) => {
  return (
    <>
      <NavigationSwiper>
        {videos.map((video: Video, index: number) => (
          <SwiperSlide key={index}>
            <MediaVideo video={video} />
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </>
  );
};

export default MediaVideoSlide;
