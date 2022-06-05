import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Layout } from "./Layout";
import { RouteWithLayout } from "./RouteWithLayout";

export class DefaultSwitch extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
}
