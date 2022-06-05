import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import authService, { AuthenticationResultStatus } from "../components/api-authorization/AuthorizeService";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";
import { useTranslation } from "react-i18next";

export const LogoutPage = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <Box>
      <Grid container className="container custom padding bottom-2" justifyContent="center">
        <Grid item>
          <h1>{t("processing_logout")}</h1>
        </Grid>
      </Grid>
    </Box>
  );
};
