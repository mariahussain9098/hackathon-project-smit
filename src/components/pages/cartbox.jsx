import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { Delete } from "@mui/icons-material";
import { Context } from "../../App";
import { Link } from "react-router-dom";

const Cartbox = () => {
  const { cartData } = useContext(Context);
  let storage = localStorage.getItem("addToCart");
  const [cartItems, setcartItems] = useState(JSON.parse(storage));
  const deleteItem = (e) => {
    let localStorageValues = JSON.parse(localStorage.getItem("addToCart"));
    localStorageValues.splice(e, 1);
    localStorage.setItem("addToCart", JSON.stringify(localStorageValues));
    console.log(localStorageValues);
    setcartItems(localStorageValues);
    cartData(localStorageValues.length);
  };

  return (
    <Container>
      <Typography variant="h3" component="h2" align="center">
        CART
      </Typography>
      <Grid container columnSpacing={5}>
        <Grid item sm={8} xs={12}>
          {cartItems.length > 0 ? (
            cartItems.map((data, index) => {
              return (
                <Grid key={data.id} container border={1} my={2}>
                  <Grid item xs={1}>
                    {data.id}
                  </Grid>
                  <Grid item xs={3}>
                    <img width={100} src={data.images[0]} />
                  </Grid>
                  <Grid item xs={2}>
                    {data.title}
                  </Grid>
                  <Grid item xs={1}>
                    {data.price}
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteItem(index);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <h1>No Item In your cart</h1>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
          sunt dolores nisi tenetur perferendis, deleniti neque sit voluptatum
          doloribus obcaecati magnam nulla, totam veniam quibusdam officiis
          iusto, iste voluptate in?
          <Link to="/checkout">
            <Button>Go to Checkout</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cartbox;
