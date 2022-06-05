import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";
import React from "react";
export const MyNumberField = (props) => {
  let error = props.helperText !== "" && props.helperText !== null && props.helperText !== undefined;
  return (
    <NumberFormat
      size={props.size ? props.size : "medium"}
      customInput={TextField}
      format={props.format}
      mask="_"
      style={{ width: "100%", margin: "1rem 0", ...props.style }}
      helperText={props.helperText}
      error={error}
      value={props.value}
      variant="outlined"
      label={props.label}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      onKeyPress={props.onKeyPress}
    />
  );
};
