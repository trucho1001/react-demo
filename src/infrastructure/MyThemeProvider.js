import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
const theme = createTheme();
export const MyThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
