import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
export const MyDropdown = (props) => {
  let error = props.helperText !== "" && props.helperText !== null && props.helperText !== undefined;
  return (
    <Autocomplete
      size={props.size ? props.size : "medium"}
      options={props.options}
      freeSolo={props.freeSolo}
      getOptionLabel={(option) => {
        return option.value ? option.value.toString() : option.toString();
      }}
      fullWidth={props.fullWidth != null ? props.fullWidth : true}
      onChange={props.onChange}
      disableClearable={props.disableClearable ? props.disableClearable : false}
      value={props.value ? props.value : null}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={props.helperText}
          error={error}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.freeSolo ? props.onFreeSolo : null}
          label={props.label}
          variant="outlined"
          style={{ width: "100%", margin: "1rem 0", ...props.style }}
          className={props.className}
          inputProps={{
            ...params.inputProps,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            },
          }}
        />
      )}
    />
  );
};
