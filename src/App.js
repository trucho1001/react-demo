import React, { Component } from "react";
import MyProvider from "./contexts/MyProvider";
import "./custom.css";
import "./styles/main.scss";
import { DefaultSwitch } from "./infrastructure/DefaultSwitch";
// import { SnackbarProvider } from "notistack";
// import { SnackbarUtilsConfigurator } from "./SnackbarUtils";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      mode: "public",
    };
  }

  render() {
    if (this.state.mode != "")
      return (
        <MyProvider {...this.state}>
          <DefaultSwitch />
        </MyProvider>
      );
    return "";
  }
}
