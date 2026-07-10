import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { usecartStore } from "./store/cartStore.js";

const ProtectedRoute = ({ children }) => {
  const token = usecartStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
