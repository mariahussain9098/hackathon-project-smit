import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/routes/routing";
import Navlinks from "./components/routes/navlinks";
export const Context = createContext();
const App = () => {
  const [productsData, setproductsData] = useState(null);
  const [cart, setCart] = useState(0);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(`data added ${data}`);
        setproductsData(data.products);
      });
  }, []);

  useEffect(() => {
    let localstoragevalues = localStorage.getItem("addToCart");
    if (localstoragevalues) {
      let av = JSON.parse(localstoragevalues).length;
      return setCart(av);
    }
  }, []);

  const cartData = (e) => {
    setCart(e);
  };

  return (
    <Context.Provider value={{ cart, cartData, productsData }}>
      <BrowserRouter>
        <Navlinks />
        <Routing productsData={productsData} />
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
