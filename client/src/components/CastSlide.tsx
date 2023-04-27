import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Typography } from "@mui/material";
import { Cast } from "types/index.types";
import tmdbConfig from "lib/api/config/tmdb.config";
import uiConfigs from "configs/ui.config";
import { pageRouters } from "routes/router";

const CastSlide = ({ casts }: { casts: Cast[] }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts?.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={pageRouters.person(cast.id)}>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "text.primary",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfig.posterPath(cast.profile_path)
                  ),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
