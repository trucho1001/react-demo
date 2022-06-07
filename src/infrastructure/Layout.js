import { Box, Drawer, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";
import { lngs, roles } from "../Constant";
import MyContext from "../contexts/MyContext";

export const Layout = (props) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {}, []);

  return (
    <MyContext.Consumer>
      {(context) => (
        <React.Fragment>
          <Box sx={{ display: "flex" }} flexDirection="column">
            <Drawer
              variant="permanent"
              anchor="left"
              PaperProps={{ style: { width: "150px", fontSize: "1rem" } }}
            >
              <h4 style={{ padding: "1rem 1rem 0 1rem" }}>{t("menu")}</h4>
              <List>
                {context.role == roles.user ? (
                  <>
                    <ListItem>
                      <NavLink to="/" style={{ color: "black" }}>
                        {t("dashboard")}
                      </NavLink>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem>
                      <NavLink to="/" style={{ color: "black" }}>
                        {t("dashboard")}
                      </NavLink>
                    </ListItem>
                    <ListItem>
                      <NavLink to="/settings" style={{ color: "black" }}>
                        {t("settings")}
                      </NavLink>
                    </ListItem>
                  </>
                )}
                <ListItem>
                  <NavLink to="/logout" style={{ color: "black" }}>
                    {t("logout")}
                  </NavLink>
                </ListItem>
              </List>
            </Drawer>
            <Box component="main" marginLeft={`150px`}>
              {props.children}
            </Box>
          </Box>
        </React.Fragment>
      )}
    </MyContext.Consumer>
  );
};
