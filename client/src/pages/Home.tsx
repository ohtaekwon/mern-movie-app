import React from "react";
import HeroSlide from "components/HeroSlide";
import tmdbConfig from "lib/api/config/tmdb.config";
import { Box } from "@mui/material";
import uiConfigs from "configs/ui.config";
import Container from "components/Container";
import MediaSlide from "components/MediaSlide";

const Home = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfig.mediaType.movie}
        mediaCategory={tmdbConfig.mediaCategory.popular}
      />
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="인기 영화">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.movie}
            mediaCategory={tmdbConfig.mediaCategory.popular}
          />
        </Container>

        <Container header="인기 TV 시리즈">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.tv}
            mediaCategory={tmdbConfig.mediaCategory.popular}
          />
        </Container>

        <Container header="평점 높은 영화">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.movie}
            mediaCategory={tmdbConfig.mediaCategory.top_rated}
          />
        </Container>

        <Container header="평점 높은 TV 시리즈">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.tv}
            mediaCategory={tmdbConfig.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};
export default Home;
