import { Alert, Box, Grid, Link } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthApiService from "../../api/AuthApiService";
import { MyButton } from "../../components/my-button/MyButton";
import { MyTextField } from "../../components/my-text-field/MyTextField";
import { ValidTextRegExp } from "../../Constant";
import MyContext from "../../contexts/MyContext";
import SnackbarUtils from "../../utils/SnackbarUtils";

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
    let isValid = true;
    if (!username) {
      setUsernameErr(t("required"));
      isValid = false;
    } else setUsernameErr("");
    if (!password) {
      setPasswordErr(t("required"));
      isValid = false;
    } else setPasswordErr("");
    if (!isValid) return;
    let result = await AuthApiService.login(username, password);
    if (result.status == 200) {
      SnackbarUtils.success("success");
      myContext.changeRole(result.user.role);
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
                label={t("Username")}
                value={username}
                onChange={setUsername}
                regExp={ValidTextRegExp}
                helperText={usernameErr}
              />
              <MyTextField
                type="password"
                label={t("Password")}
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
