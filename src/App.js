import React, { Component } from "react";
import MyProvider from "./contexts/MyProvider";
import "./styles/main.scss";
import { DefaultSwitch } from "./infrastructure/DefaultSwitch";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/SnackbarUtils";
import { MyThemeProvider } from "./infrastructure/MyThemeProvider";

export default class App extends Component {
  render() {
    return (
      <MyThemeProvider>
        <SnackbarProvider>
          <SnackbarUtilsConfigurator />
          <MyProvider>
            <DefaultSwitch />
          </MyProvider>
        </SnackbarProvider>
      </MyThemeProvider>
    );
  }
}
