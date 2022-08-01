import { Routes, Route } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { CartProvider } from "./hooks/cart";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Box sx={{ pb: 8, pt: 1, pl: 2, pr: 2 }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/pedido" element={<Cart />} />
          <Route path="comidinha">
            <Route path=":id" element={<Product />} />
          </Route>
        </Routes>

        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels value="Comidinhas">
            <BottomNavigationAction
              label="Comidinhas"
              icon={<FastfoodIcon />}
              component={Link}
              to="/"
            />
            <BottomNavigationAction
              label="Meu pedido"
              icon={<ShoppingBasketIcon />}
              component={Link}
              to="/pedido"
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </CartProvider>
  );
}

export default App;
