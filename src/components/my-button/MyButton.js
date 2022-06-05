import React from "react";
import Button from "@mui/material/Button";
export const MyButton = (props) => {
  return (
    <Button
      disabled={props.disabled != null ? props.disabled : false}
      className={props.className}
      style={{ marginTop: "1rem", ...props.style }}
      onClick={props.onClick}
      color={props.color ?? "primary"}
      variant="contained"
    >
      {props.text}
    </Button>
  );
};
