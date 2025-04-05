import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Used for redirection after login

  useEffect(() => {
    
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
      axios
        .get(`${api_url}/api/users/userInfo`, {
          withCredentials: true,
        })
        .then((response) => {
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error checking authentication", error);
          setIsAuthenticated(false);
          setLoading(false);
        });
    
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (isAuthenticated) {
    return children; // Render the children (protected content)
  } else {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default ProtectedRoute;
