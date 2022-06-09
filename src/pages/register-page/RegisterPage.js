import { Box, Grid, Link } from "@mui/material";
import React, { useCallback, useContext, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import AuthApiService from "../../api/AuthApiService";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const myContext = useContext(MyContext);

  const register = async () => {
    let isValid = true;
    let validEmail = new RegExp(EmailRegExp);
    if (username == "") {
      setUsernameErr(t("Required"));
      isValid = false;
    } else {
      setUsernameErr("");
    }
    if (email == "") {
      setEmailErr(t("Required"));
      isValid = false;
    } else if (!validEmail.test(email)) {
      setEmailErr("Invalid");
      isValid = false;
    } else setEmailErr("");
    if (password == "") {
      setPasswordErr(t("Required"));
      isValid = false;
    } else if (password.length <= 5) {
      setPasswordErr("Should be more than 5 characters");
      isValid = false;
    } else setPasswordErr("");
    if (confirmPassword == "") {
      setConfirmPasswordErr(t("Required"));
      isValid = false;
    } else if (confirmPassword != password) {
      setConfirmPasswordErr("Doesn't match");
      isValid = false;
    } else {
      setConfirmPasswordErr("");
    }
    if (isValid) {
      let result = await AuthApiService.register({
        username: username,
        password: password,
      });
      if (result) {
        navigate("/login", { replace: true });
      }
    }
  };
  return (
    <MyContext.Consumer>
      {(context) => (
        <Box>
          <Grid container className="container custom padding bottom-2" justifyContent="center">
            <Grid item xs={4}>
              <h1>{t("register").toUpperCase()}</h1>
              <MyTextField label={t("Username")} value={username} onChange={setUsername} regExp={ValidTextRegExp} helperText={usernameErr} />
              <MyTextField label={t("Email")} value={email} onChange={setEmail} regExp={ValidTextRegExp} helperText={emailErr} />
              <MyTextField type="password" label={t("Password")} value={password} onChange={setPassword} helperText={passwordErr} />
              <MyTextField
                type="password"
                label={t("Confirm password")}
                value={confirmPassword}
                onChange={setConfirmPassword}
                helperText={confirmPasswordErr}
              />
              <MyButton className="margin bottom-1 right-1" onClick={(e) => register()} text={t("register")} />
              <Link href="/login">Login?</Link>
              {message && (
                <Alert variant="filled" severity="error" className="margin top-1 bottom-1">
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
