
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { navitems } from "../helper/helper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navlinks = () => {
  const navigate = useNavigate();
  const { cart } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const goToCartPage = () => {
    navigate("/cart");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "auto"; // Ensure body scroll is enabled when menu is closed
    } else {
      document.body.style.overflow = "hidden"; // Prevent body scroll when menu is open
    }
  }, [menuOpen]);

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #6D28D9, #3B82F6)', // Gradient background for navbar
        paddingBottom: 0,
        paddingX: 2, // Adjust padding
        zIndex: 1200, // Ensure it appears above other content
      }}
    >
      <Toolbar sx={{ paddingX: 2, justifyContent: 'space-between' }}>
        {/* Mobile Menu Button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { lg: 'none' } }}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            MyWebsite
          </NavLink>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
          {navitems.map((data, index) => (
            <Button
              key={index}
              component={NavLink}
              to={data.to}
              sx={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'medium',
                mx: 1, // Reduced margin
                '&:hover': {
                  color: '#93C5FD',
                },
              }}
            >
              {data.name}
            </Button>
          ))}
          <IconButton color="inherit" onClick={goToCartPage} sx={{ ml: 1 }}>
            <Badge badgeContent={cart} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button
            component={NavLink}
            to="/login"
            sx={{
              color: 'white',
              background: 'linear-gradient(135deg, #6D28D9, #3B82F6)', // Diagonal gradient
              borderRadius: 1,
              px: 2,
              py: 1,
              ml: 2, // Adjust margin to move closer to the right
              '&:hover': {
                background: '#4F46E5',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <Box
        sx={{
          display: { xs: menuOpen ? 'flex' : 'none', lg: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed', // Change to fixed positioning
          top: 0, // Align to the top
          left: 0,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent
          height: '100vh', // Full viewport height
          zIndex: 1100, // Ensure it appears below the navbar but above content
          overflowY: 'auto', // Ensure scrolling within the menu if needed
        }}
      >
        {navitems.map((data, index) => (
          <Button
            key={index}
            component={NavLink}
            to={data.to}
            sx={{
              color: 'black',
              fontSize: '1rem',
              fontWeight: 'medium',
              my: 1,
              '&:hover': {
                color: '#2563EB',
              },
            }}
            onClick={() => setMenuOpen(false)} // Close the menu on item click
          >
            {data.name}
          </Button>
        ))}
        <Button
          component={NavLink}
          to="/login"
          sx={{
            color: 'white',
            background: 'linear-gradient(135deg, #3B82F6, #6D28D9)', // Diagonal gradient
            borderRadius: 1,
            px: 2,
            py: 1,
            my: 1,
            '&:hover': {
              background: '#4F46E5',
            },
          }}
        >
          Login
        </Button>
      </Box>
    </AppBar>
  );
};

export default Navlinks;
