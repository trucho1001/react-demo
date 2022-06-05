import { Box } from "@material-ui/core";
import React from "react";
export const Circle = (props) => {
  return (
    <Box
      color="primary.contrastText"
      bgcolor="primary.main"
      style={{
        height: "40px",
        lineHeight: "40px",
        borderRadius: "50%",
        textAlign: "center",
        width: "40px",
        minWidth: "40px",
      }}
    >
      {props.children}
    </Box>
  );
};
