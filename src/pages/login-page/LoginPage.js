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
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Copyright } from "../../components/copyright/Copyright";
import { MyCheckbox } from "../../components/my-checkbox/MyCheckbox";

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
      setUsernameErr(t("Required"));
      isValid = false;
    } else setUsernameErr("");
    if (!password) {
      setPasswordErr(t("Required"));
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <MyTextField label={t("Username")} value={username} onChange={setUsername} regExp={ValidTextRegExp} helperText={usernameErr} />
              <MyTextField type="password" label={t("Password")} value={password} onChange={setPassword} helperText={passwordErr} />
              <MyCheckbox label="Remember me" className="margin top-0 bottom-0" onChange={() => {}} />
              <MyButton fullWidth={true} className="margin bottom-1" onClick={(e) => login()} text={t("login")} />
              <Grid container>
                <Grid item xs>
                  <Link href="/login#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              {message && (
                <Alert variant="filled" severity="error" className="margin top-1 bottom-1">
                  {message}
                </Alert>
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      )}
    </MyContext.Consumer>
  );
};
