import React, { Component } from "react";
import MyContext from "./MyContext";

export default class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getInitialState(),
    };
  }

  getInitialState = () => ({
    data: "",
  });

  resetState = () => {
    this.setState(this.getInitialState());
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          data: this.state.data,
          changeData: (data) => {
            this.setState({ data });
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
