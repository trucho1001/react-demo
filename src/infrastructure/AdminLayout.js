import { Drawer, List, ListItem, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";
import { lngs } from "../Constant";

export const AdminLayout = (props) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }} flexDirection="column">
        <Box component="main" marginLeft={`150px`}>
          {props.children}
        </Box>
      </Box>
    </React.Fragment>
  );
};
