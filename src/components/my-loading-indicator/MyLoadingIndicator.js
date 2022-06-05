import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

export const MyLoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <Backdrop invisible={true} open={true} style={{ zIndex: 999999, color: "#fff" }}>
        <CircularProgress />
      </Backdrop>
    )
  );
};
