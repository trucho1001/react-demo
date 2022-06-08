import { ButtonBase } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Component, Fragment } from "react";

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg) {
    this.toast(msg, { variant: "success" });
  },
  warning(msg) {
    this.toast(msg, { variant: "warning", persist: true });
  },
  info(msg) {
    this.toast(msg, { variant: "info" });
  },
  error(msg) {
    this.toast(msg, { variant: "error", persist: true });
  },
  toast(msg, props) {
    useSnackbarRef.enqueueSnackbar(msg, { ...props });
  },
};
