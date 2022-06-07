import React from "react";
import { Component } from "react";
import { Route, Navigate } from "react-router-dom";
import { ApplicationPaths, QueryParameterNames } from "./ApiAuthorizationConstants";
import authService from "./AuthorizeService";

export default class AuthorizeRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      authenticated: false,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.authenticationChanged());
    this.populateAuthenticationState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  render() {
    const { ready, authenticated } = this.state;
    var link = document.createElement("a");
    link.href = this.props.path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    // const redirectUrl = this.props.redirectUrl ?? `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(returnUrl)}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(returnUrl)}`;
    if (!ready) {
      return <React.Fragment></React.Fragment>;
    } else {
      const { component: Component, layout: Layout, ...rest } = this.props;
      return (
        <React.Fragment></React.Fragment>
        // <Route
        //   {...rest}
        //   render={(props) => {
        //     if (authenticated) {
        //       if (Layout) {
        //         return (
        //           <Layout>
        //             <Component {...props} />
        //           </Layout>
        //         );
        //       } else {
        //         return <Component {...props} />;
        //       }
        //     } else {
        //       return <Navigate to={redirectUrl} />;
        //     }
        //   }}
        // />
      );
    }
  }

  async populateAuthenticationState() {
    const authenticated = await authService.isAuthenticated();
    this.setState({ ready: true, authenticated });
  }

  async authenticationChanged() {
    this.setState({ ready: false, authenticated: false });
    await this.populateAuthenticationState();
  }
}
