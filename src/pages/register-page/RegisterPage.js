import { Box, Grid } from "@mui/material";
import React, { useCallback, useContext, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import { MyButton } from "../../components/my-button/MyButton";
import { MyTextField } from "../../components/my-text-field/MyTextField";
import { EmailRegExp, ValidTextRegExp } from "../../Constant";
import MyContext from "../../contexts/MyContext";

export const RegisterPage = (props) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const myContext = useContext(MyContext);

  const register = () => {
    let isValid = true;
    let validEmail = new RegExp(EmailRegExp);
    if (username == "") {
      setUsernameErr(t("required"));
      isValid = false;
    } else {
      setUsernameErr("");
    }
    if (email == "") {
      setEmailErr(t("required"));
      isValid = false;
    } else if (!validEmail.test(email)) {
      setEmailErr("invalid");
    } else setEmailErr("");
    if (password == "") {
      setPasswordErr(t("required"));
      isValid = false;
    } else {
      setPasswordErr("");
    }
    if (isValid) {
      myContext.addUsers({ username: username, password: password });
      navigate("/login", { replace: true });
    }
  };
  return (
    <MyContext.Consumer>
      {(context) => (
        <Box>
          <Grid
            container
            className="container custom padding bottom-2"
            justifyContent="center"
          >
            <Grid item xs={4}>
              <h1>{t("register").toUpperCase()}</h1>
              <MyTextField
                label={t("username")}
                value={username}
                onChange={setUsername}
                regExp={ValidTextRegExp}
                helperText={usernameErr}
              />
              <MyTextField
                label={t("email")}
                value={email}
                onChange={setEmail}
                regExp={ValidTextRegExp}
                helperText={emailErr}
              />
              <MyTextField
                type="password"
                label={t("password")}
                value={password}
                onChange={setPassword}
                helperText={passwordErr}
              />
              <MyButton
                className="margin bottom-1"
                onClick={(e) => register()}
                text={t("register")}
              />
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
