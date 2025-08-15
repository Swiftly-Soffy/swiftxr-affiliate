
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { Box } from "@mui/material";

import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ProductPage from "./pages/ProductPage";
import { AppThemeProvider } from "./components/Themes/theme";



const PageLayout = () => (
  <Box>
    <Header />
    <Outlet />
    <Footer />
  </Box>
);

function App() {

  return (
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
  );
}

export default App;
