import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard-page/DashboardPage";
import { LoginPage } from "../pages/login-page/LoginPage";
import { SettingsPage } from "../pages/settings-page/SettingsPage";
import { Layout } from "./Layout";
import { LogoutPage } from "../pages/logout-page/LogoutPage";
import { RegisterPage } from "../pages/register-page/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";

export class DefaultSwitch extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Layout>
                <LogoutPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }
}
