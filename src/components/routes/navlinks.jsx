import React from "react";
import { navitems } from "../helper/helper";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { Context } from "../../App";
const Navlinks = () => {
  const navigate = useNavigate();
  const { cart } = useContext(Context);

  const goToCartPage = () => {
    // console.log("HELLO WORLD");
    navigate("/cart");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {navitems.map((data, index) => {
            return (
              <Grid sx={{ marginX: 2 }} key={index}>
                <NavLink to={data.to}>{data.name}</NavLink>
                <br />
              </Grid>
            );
          })}
          <span onClick={goToCartPage}>
            <Badge badgeContent={cart} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>
          </span>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navlinks;
