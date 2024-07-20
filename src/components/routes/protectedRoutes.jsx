import React, { useEffect } from "react";
import LoginComp from "../pages/loginComp";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ MyComponent }) => {
  const navigate = useNavigate();
  let isUserLogedIn = localStorage.getItem("isUserLogedIn");
  if (!isUserLogedIn) {
    useEffect(() => {
      navigate("/login");
    }, []);
  } else {
    return <MyComponent />;
  }
};

export default ProtectedRoutes;
