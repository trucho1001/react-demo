import React, { Component } from "react";
import { Switch } from "react-router";
import AuthorizeRoute from "../components/api-authorization/AuthorizeRoute";
import { AdminPage } from "../pages/AdminPage";
import { HomePage } from "../pages/HomePage";
import { AdminLayout } from "./AdminLayout";
import { Layout } from "./Layout";
import { RouteWithLayout } from "./RouteWithLayout";

export class AdminSwitch extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <Switch>
        <AuthorizeRoute layout={AdminLayout} exact path="/admin" component={AdminPage} />
        <RouteWithLayout layout={Layout} exact path="/" component={HomePage} />
      </Switch>
    );
  }
}
