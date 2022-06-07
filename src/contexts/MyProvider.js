import React, { Component } from "react";
import MyContext from "./MyContext";

export default class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    authorized: false,
    users: [],
  });

  resetState = () => {
    this.setState(this.getInitialState());
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          authorized: this.state.authorized,
          changeAuthorized: (authorized) => {
            this.setState({ authorized });
          },
          users: this.state.users,
          addUsers: (user) => {
            this.setState((prevState) => ({
              users: [...prevState.users, user],
            }));
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
