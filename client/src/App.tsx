
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";

import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ProductPage from "./pages/ProductPage";
import { AppThemeProvider } from "./components/Themes/theme";

import { ResponsiveViewContextProvider } from "./components/providers";


const PageLayout = () => (
  <Box>
    <Header />
    <Outlet />
    <Footer />
  </Box>
);

function App() {
  const isMobile = useMediaQuery("(max-width:680px)");

  return (
    <ResponsiveViewContextProvider isMobile={isMobile}>
      <AppThemeProvider
          //mode="dark"
        mode="light"
        >
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductPage />} />
          </Route>
        </Routes>
        </AppThemeProvider>
    </ResponsiveViewContextProvider>
  );
}

export default App;
