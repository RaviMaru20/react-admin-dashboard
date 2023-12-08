import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  return (
    <Box>
      <Typography
        variant={isNonMobile ? "h2" : "h4"}
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant={isNonMobile ? "h5" : "h6"}
        color={theme.palette.secondary[300]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
