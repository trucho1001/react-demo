import React, { Component } from "react";
import { NavMenu } from "../components/NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
