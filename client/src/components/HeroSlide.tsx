import React from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { Link } from "react-router-dom";
import { pageRouters } from "routes/router";

import { Props } from "./HeroSlide.type";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { toast } from "react-toastify";

import uiConfigs from "configs/ui.config";
import mediaApis from "lib/api/modules/media.api";
import genreApis from "lib/api/modules/genre.api";
import tmdbConfig from "lib/api/config/tmdb.config";
import CircularRate from "./CircularRate";
import { GenresType, MediaType } from "types/index.types";

const HeroSlide = ({
  mediaType,
  mediaCategory,
}: React.PropsWithChildren<Props>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = React.useState<MediaType[]>([]);
  const [genres, setGenres] = React.useState<GenresType[]>([]);

  React.useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApis.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response?.results);
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await genreApis.getList({ mediaType });
      if (response) {
        setGenres(response?.genres);
        getMedias();
      }
      if (error) {
        toast.error(error.message);
        setGlobalLoading(false);
      }
    };
    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          color: "primary.contrastText",
          "&::before": {
            content: '""',
            width: "100%",
            height: "30%",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
            ...uiConfigs.style.gradientBgImage[theme.palette.mode],
          },
        }}
      >
        <Swiper grabCursor={true} loop={true} style={{ width: "100%" }}>
          {movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  paddingTop: {
                    xs: "130%",
                    sm: "80%",
                    md: "60%",
                    lg: "45%",
                  },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfig.backdropPath(
                    (movie.backdrop_path || movie.poster_path)!
                  )})`,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.horizontalGradientBgImage[
                    theme.palette.mode
                  ],
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingX: "30px",
                    color: "text.primary",
                    width: { sm: "unset", md: "30%", lg: "40%" },
                  }}
                >
                  <Stack spacing={4} direction="column">
                    {/* title */}
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                    >
                      {movie.title || movie.name}
                    </Typography>
                    {/* title */}

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* rating */}
                      <CircularRate value={movie.vote_average!} />
                      {/* rating */}

                      <Divider orientation="vertical" />
                      {/* genres */}
                      {[...movie.genre_ids]
                        .splice(0, 2)
                        .map((genreId, index) => (
                          <Chip
                            variant="filled"
                            color="primary"
                            key={index}
                            label={
                              genres.find((e) => e.id === genreId) &&
                              genres.find((e) => e.id === genreId)?.name
                            }
                          />
                        ))}
                      {/* genres */}
                    </Stack>

                    {/* overview */}
                    <Typography
                      variant="body1"
                      sx={{
                        ...uiConfigs.style.typoLines(3),
                      }}
                    >
                      {movie.overview}
                    </Typography>

                    {/* overview */}

                    {/* buttons */}
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={pageRouters.mediaDetail(mediaType, movie.id)}
                      sx={{ width: "max-content" }}
                    >
                      보러가기
                    </Button>
                    {/* buttons */}
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default HeroSlide;
