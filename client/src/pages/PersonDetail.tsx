import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import personApis from "lib/api/modules/person.api";

import { toast } from "react-toastify";
import { Box, Toolbar, Typography, Stack } from "@mui/material";
import uiConfigs from "configs/ui.config";
import tmdbConfig from "lib/api/config/tmdb.config";
import Container from "components/Container";
import PersonMediaGrid from "components/PersonMediaGrid";

const PersonDetail = () => {
  const { personId } = useParams<{ personId: string }>();
  const [person, setPerson] = React.useState<any>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await personApis.detail({
        personId: personId!,
      });
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${tmdbConfig.posterPath(
                      person.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${
                      person.birthday && person.birthday.split("-")[0]
                    }`}
                    {person.deathday &&
                      ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonMediaGrid personId={personId!} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
