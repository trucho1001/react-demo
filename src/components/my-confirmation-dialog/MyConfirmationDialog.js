import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

const MyConfirmationDialog = ({ title, message, resolve }) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(true);
  const onConfirm = () => {
    setDialogOpen(false);
    removeDialog();
    resolve(true);
  };
  const onDismiss = () => {
    setDialogOpen(false);
    removeDialog();
    resolve(false);
  };
  return (
    <Dialog open={dialogOpen} onClose={onDismiss}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss}>{t("cancel")}</Button>
        <Button color="primary" variant="contained" onClick={onConfirm}>
          {t("ok")}
        </Button>
      </DialogActions>{" "}
    </Dialog>
  );
};

export const getConfirmation = ({ title, message }) => {
  return new Promise((resolve, reject) => {
    addDialog(title, message, resolve);
  });
};

function addDialog(title, message, resolve) {
  const body = document.getElementsByTagName("body")[0];
  const div = document.createElement("div");
  div.setAttribute("id", "getValue-container");
  body.appendChild(div);
  ReactDOM.render(<MyConfirmationDialog resolve={resolve} title={title} message={message} />, div);
}

function removeDialog() {
  const div = document.getElementById("getValue-container");
  const body = document.getElementsByTagName("body")[0];
  body.removeChild(div);
}
