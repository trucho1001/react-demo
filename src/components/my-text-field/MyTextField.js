import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export const MyTextField = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);

  const handleChange = (value) => {
    if (!props.regExp) {
      setValue(value);
      props.onChange(value);
    } else {
      let valid = new RegExp(props.regExp);
      if (valid.test(value)) {
        setValue(value);
        props.onChange(value);
      }
    }
  };

  useEffect(() => {
    if (!props.value) setValue(props.value);
    else if (!!props.value && value !== props.value) setValue(props.value);
  }, [props.value]);

  return (
    <TextField
      size={props.size ? props.size : "medium"}
      style={{ width: "100%", margin: "1rem 0", ...props.style }}
      helperText={props.helperText}
      error={!!props.helperText}
      type={props.type}
      value={value}
      variant="outlined"
      label={props.label}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={props.placeholder}
      onKeyPress={props.onKeyPress}
      multiline={props.multiline}
      rows={props.rows}
      inputProps={{ maxLength: props.maxLength }}
    />
  );
};
