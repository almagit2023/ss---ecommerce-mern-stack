import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAdmin, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to continue");
      navigate("/login");
    } else if (token && !isAdmin) {
      navigate("/");
      toast.error("This is not for users");
    }
  }, [isAdmin, token, navigate]);

  if (!token || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
