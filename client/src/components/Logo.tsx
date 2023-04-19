import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();
  return (
    <Typography>
      TK <span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  );
};
export default Logo;
