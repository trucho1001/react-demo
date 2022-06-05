import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
const theme = createTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: "#0046A5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: {
      main: "#9D0009",
    },
  },
});
export const MyThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
