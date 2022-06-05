import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { ApplicationPaths, LoginActions, LogoutActions } from "./ApiAuthorizationConstants";

export default class ApiAuthorizationRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path={ApplicationPaths.Login} render={() => loginAction(LoginActions.Login)} />
        <Route exact path={ApplicationPaths.LoginFailed} render={() => loginAction(LoginActions.LoginFailed)} />
        <Route exact path={ApplicationPaths.LoginCallback} render={() => loginAction(LoginActions.LoginCallback)} />
        <Route exact path={ApplicationPaths.Profile} render={() => loginAction(LoginActions.Profile)} />
        <Route exact path={ApplicationPaths.Register} render={() => loginAction(LoginActions.Register)} />
        <Route exact path={ApplicationPaths.LogOut} render={() => logoutAction(LogoutActions.Logout)} />
        <Route exact path={ApplicationPaths.LogOutCallback} render={() => logoutAction(LogoutActions.LogoutCallback)} />
        <Route exact path={ApplicationPaths.LoggedOut} render={() => logoutAction(LogoutActions.LoggedOut)} />
      </Fragment>
    );
  }
}

function loginAction(name) {
  return <Login action={name}></Login>;
}

function logoutAction(name) {
  return <Logout action={name}></Logout>;
}
