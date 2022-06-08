import React, { Component } from "react";
import MyContext from "./MyContext";

export default class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    authorized: false,
    role: "",
  });

  resetState = () => {
    this.setState(this.getInitialState());
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          role: this.state.role,
          changeRole: (role) => {
            this.setState({ role });
          },
          authorized: this.state.authorized,
          changeAuthorized: (authorized) => {
            this.setState({ authorized });
          },
          resetState: () => {
            this.resetState();
          },
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
