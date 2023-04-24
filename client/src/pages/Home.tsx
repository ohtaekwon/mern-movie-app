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
        <Container header="popular movies">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.movie}
            mediaCategory={tmdbConfig.mediaCategory.popular}
          />
        </Container>

        <Container header="popular series">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.tv}
            mediaCategory={tmdbConfig.mediaCategory.popular}
          />
        </Container>

        <Container header="top rated movies">
          <MediaSlide
            mediaType={tmdbConfig.mediaType.movie}
            mediaCategory={tmdbConfig.mediaCategory.top_rated}
          />
        </Container>

        <Container header="top rated series">
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
