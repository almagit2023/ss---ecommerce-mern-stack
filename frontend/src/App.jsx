import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import MenSpecial from "./pages/MenSpecial";
import WomenSpecial from "./pages/WomenSpecial";
import ChildrenSpecial from "./pages/ChildrenSpecial";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import { LogIn } from "lucide-react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import {
  setAllProducts,
  setChildrenSpecial,
  setMensSpecial,
  setWomenSpecial,
} from "./redux/slice/product";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { allProductFunction } from "./services/operations/product";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Purchases from "./pages/Purchases";

function App() {
  const location = useLocation();

  const excludeNavbarRoutes = ["/login", "/signup"];

  return (
    <div className="max-w-7xl mx-auto min-h-screen overflow-hidden">
      {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchases" element={<Purchases />} />


        <Route path="/men-special" element={<MenSpecial />} />
        <Route path="/women-special" element={<WomenSpecial />} />
        <Route path="/children-special" element={<ChildrenSpecial />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
