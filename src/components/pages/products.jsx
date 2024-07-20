import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { Context } from "../../App";

const Products = () => {
  const { cartData, productsData } = useContext(Context);
  const [apiData, setapiData] = useState(null);
  const filterData = (e) => {
    let filterapiData = productsData.filter((val, ind) => {
      return val.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setapiData(filterapiData);
  };

  useEffect(() => {
    setapiData(productsData);
  }, [productsData]);

  const AddToCart = (e) => {
    let storage = localStorage.getItem("addToCart");
    if (storage) {
      let allData = JSON.parse(storage);
      let isRepeated = allData.find((val, index) => {
        return val.title.toLowerCase().includes(e.title.toLowerCase());
      });
      if (isRepeated) {
        Swal.fire({
          title: "Warning",
          text: "Item Already In Cart",
          icon: "info",
        });
      } else {
        localStorage.setItem("addToCart", JSON.stringify([...allData, e]));
        Swal.fire({
          title: "Thank you",
          text: "Product Added",
          icon: "success",
        });
        let counting = JSON.parse(localStorage.getItem("addToCart"));
        cartData(counting.length);
      }
    } else {
      localStorage.setItem("addToCart", JSON.stringify([e]));
      Swal.fire({
        title: "Thank you",
        text: "Product Added",
        icon: "success",
      });
      let counting = JSON.parse(localStorage.getItem("addToCart"));
      cartData(counting.length);
    }
    // console.log(e);
  };

  return (
    <>
      <Grid my={4}>
        <TextField
          variant="filled"
          label="search items"
          type="text"
          onChange={filterData}
        />
      </Grid>

      <Grid container mt={5} columnSpacing={4} rowSpacing={4}>
        {apiData &&
          apiData.map((data, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={data.thumbnail}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.description}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Rs. {data.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => {
                        AddToCart(data);
                      }}
                      variant="contained"
                      size="small"
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Products;
