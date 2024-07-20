import React from "react";
// import { routing } from "../helper/helper";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Products from "../pages/products";
import Cartbox from "../pages/cartbox";
import Checkout from "../pages/checkout";
import ProtectedRoutes from "./protectedRoutes";
import LoginComp from "../pages/loginComp";

const Routing = ({ productsData }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cartbox />} />
      <Route
        path="/products"
        element={<Products productsData={productsData} />}
      />
      <Route
        path="/checkout"
        element={<ProtectedRoutes MyComponent={Checkout} />}
      />
      <Route path="/login" element={<LoginComp />} />
    </Routes>
  );
};

export default Routing;
