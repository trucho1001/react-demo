import React, { Component } from "react";
import MyProvider from "./contexts/MyProvider";
import "./styles/main.scss";
import { DefaultSwitch } from "./infrastructure/DefaultSwitch";
// import { SnackbarProvider } from "notistack";
// import { SnackbarUtilsConfigurator } from "./SnackbarUtils";

export default class App extends Component {
  render() {
    return (
      <MyProvider>
        <DefaultSwitch />
      </MyProvider>
    );
  }
}
