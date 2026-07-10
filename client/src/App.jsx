import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { usecartStore } from "./store/cartStore.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";

const ProtectedRoute = ({ children }) => {
  const token = usecartStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Products />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
