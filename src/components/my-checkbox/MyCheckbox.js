// @flow
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@material-ui/core";
import React from "react";
export const MyCheckbox = (props) => {
  return (
    <>
      <FormControl error={props.helperText && true} component="fieldset" fullWidth style={{ margin: "1rem 0" }} className={props.className}>
        <FormGroup>
          <FormControlLabel
            style={{ width: "100%", marginBottom: "0" }}
            control={<Checkbox checked={props.checked} onChange={(e) => props.onChange(e.target.checked)} />}
            label={props.label}
          />
        </FormGroup>
        {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
