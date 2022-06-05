import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React, { Component, Fragment } from "react";

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const onClickDismiss = (key) => {
  useSnackbarRef.closeSnackbar(key);
};

const action = (key) => (
  <Fragment>
    <ButtonBase>
      <Close onClick={() => onClickDismiss(key)} />
    </ButtonBase>
  </Fragment>
);

export default {
  success(msg) {
    this.toast(msg, { variant: "success" });
  },
  warning(msg) {
    this.toast(msg, { variant: "warning", persist: true, action });
  },
  info(msg) {
    this.toast(msg, { variant: "info" });
  },
  error(msg) {
    this.toast(msg, { variant: "error", persist: true, action });
  },
  toast(msg, props) {
    useSnackbarRef.enqueueSnackbar(msg, { ...props });
  },
};
