import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox } from "@material-ui/core";

export const MySelect = (props) => {
  const [value, setValue] = React.useState(props.value);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    props.onChange(value);
  };
  return (
    <FormControl size={props.size ? props.size : "medium"} variant="outlined" style={{ width: "100%", margin: "1rem 0", ...props.style }}>
      <InputLabel htmlFor="outlined-native-simple">{props.label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) => selected.map((item) => item.value).join(", ")}
        label={props.label}
        inputProps={{
          id: "outlined-native-simple",
        }}
      >
        {props.options.map((option) => (
          <MenuItem key={option.key} value={option}>
            <Checkbox className="margin right-1 padding-0" checked={value.find((item) => item.key == option.key) !== undefined} />
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
