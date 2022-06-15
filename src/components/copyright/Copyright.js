import { Typography } from "@mui/material";
import React from "react";

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
