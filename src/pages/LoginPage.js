import { Alert, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MyButton } from "../components/my-button/MyButton";
import { MyTextField } from "../components/my-text-field/MyTextField";
import { ValidTextRegExp } from "../Constant";

export const LoginPage = (props) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const login = async () => {
    setMessage(t("login"));
  };

  return (
    <Box>
      <Grid container className="container custom padding bottom-2" justifyContent="center">
        <Grid item>
          <h1>{t("login").toUpperCase()}</h1>
          <MyTextField label={t("username")} value={username} onChange={setUsername} regExp={ValidTextRegExp} />
          <MyTextField type="password" label={t("password")} value={password} onChange={setPassword} />
          <MyButton className="margin bottom-1" onClick={(e) => login()} text={t("login")} />
          {message && (
            <Alert variant="filled" severity="error" className="margin top-1 bottom-1">
              {message}
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
