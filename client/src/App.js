import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Electronics from "./pages/Electronics.jsx";
import Furniture from "./pages/Furniture.jsx";
import Fashion from "./pages/Fashion.jsx";
import Seller from "./pages/Seller.jsx";
import Product from "./pages/Product.jsx";
import Address from "./pages/Address.jsx";

function RedirectToSignup() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [navigate]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToSignup />} />
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/electronics/:id" element={<Electronics />} />
        <Route path="/furniture/:id" element={<Furniture />} />
        <Route path="/fashion/:id" element={<Fashion />} />
        <Route path="/seller/:id" element={<Seller />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/address/:id" element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
