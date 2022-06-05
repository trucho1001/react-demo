import React, { useCallback, useContext, useEffect } from "react";
import "./HomePage.scss";
import MyContext from "../contexts/MyContext";

export const HomePage = (props) => {
  const myContext = useContext(MyContext);

  useEffect(() => {
    // fetchTotalCostMax();
  }, []);

  return <MyContext.Consumer>{(context) => <div>Home page</div>}</MyContext.Consumer>;
};
