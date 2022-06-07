import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";

export const ProtectedRoute = ({ children }) => {
  const myContext = useContext(MyContext);
  if (!myContext.authorized) {
    return <Navigate to="/" replace />;
  }
  return children;
};
