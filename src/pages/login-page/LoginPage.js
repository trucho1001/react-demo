import { Alert, Box, Grid, Link } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthApiService from "../../adapters/xhr/AuthApiService";
import authService from "../../components/api-authorization/AuthorizeService";
import { MyButton } from "../../components/my-button/MyButton";
import { MyTextField } from "../../components/my-text-field/MyTextField";
import { ValidTextRegExp } from "../../Constant";
import MyContext from "../../contexts/MyContext";

export const LoginPage = (props) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const myContext = useContext(MyContext);

  const login = async () => {
    if (!username) setUsernameErr(t("required"));
    else setUsernameErr("");
    if (!password) setPasswordErr(t("required"));
    else setPasswordErr("");
    if (usernameErr != "" || passwordErr != "") return;
    let result = await AuthApiService.login(username, password);
    if (result.status == 200) {
      myContext.changeRole(result.role);
      myContext.changeAuthorized(true);
      navigate("/", { replace: true });
    } else if (result.status == 401) {
      setMessage("Something wrong");
    }
  };
  return (
    <MyContext.Consumer>
      {(context) => (
        <Box>
          <Grid
            container
            className="container custom padding top-5"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <h1>{t("login").toUpperCase()}</h1>
              <MyTextField
                label={t("username")}
                value={username}
                onChange={setUsername}
                regExp={ValidTextRegExp}
                helperText={usernameErr}
              />
              <MyTextField
                type="password"
                label={t("password")}
                value={password}
                onChange={setPassword}
                helperText={passwordErr}
              />
              <MyButton
                className="margin bottom-1 right-1"
                onClick={(e) => login()}
                text={t("login")}
              />
              <Link href="/register">Register?</Link>
              {message && (
                <Alert
                  variant="filled"
                  severity="error"
                  className="margin top-1 bottom-1"
                >
                  {message}
                </Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </MyContext.Consumer>
  );
};
