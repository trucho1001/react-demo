import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MyContext from "../../contexts/MyContext";

function navigateToReturnUrl(returnUrl) {
  // It's important that we do a replace here so that we remove the callback uri with the
  // fragment containing the tokens from the browser history.
  // window.history.pushState(null, null, returnUrl);
  window.location.replace(returnUrl);
}

export const LogoutPage = (props) => {
  const { t, i18n } = useTranslation();
  const myContext = useContext(MyContext);
  const logout = () => {
    myContext.changeAuthorized(false);
    window.location.replace("/");
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <Box>
      <Grid
        container
        className="container custom padding bottom-2"
        justifyContent="center"
      >
        <Grid item>
          <h1>{t("processing_logout")}</h1>
        </Grid>
      </Grid>
    </Box>
  );
};
