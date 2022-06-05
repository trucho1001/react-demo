import * as React from "react";
export const MyFilePicker = (props) => {
  return (
    <React.Fragment>
      {props.children}
      <input type="file" ref={props.ref} onChange={props.onChange} style={{ display: "none" }} />
    </React.Fragment>
  );
};
