import { Stack, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useResponsiveViewContext } from "../components/providers";
import type { Category, Product } from "./related/type";
const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  selectedCategory: number | null; // number or null
  categories: Category[];
};

function ProductCard({ product }: { product: Product }) {
  const { isMobile } = useResponsiveViewContext();

  return (
    <Grid size={isMobile ? 12 : 4}>
      <Stack
        spacing={2}
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          width: 1,
          p: 3,
          height: 1,
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            "& img": { objectFit: "cover", height: 320, border: 0 },
          }}
        >
          {product.Image ? (
            <img
              src={`${apiUrl}${product.Image.url}`}
              alt={product.Image.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
          ) : (
            <Box sx={{ width: "100%", height: 320, bgcolor: "grey.200", borderRadius: 2 }} />
          )}
        </Box>

        <Typography
          fontSize={18}
          color="text.primary"
          fontWeight={600}
          component={Link}
          to={`/products/${product.StoreName}`}
          sx={{ textDecoration: "none" }}
        >
          By {product.StoreName}
        </Typography>

        <Typography
          fontSize={18}
          color="text.primary"
          fontWeight={600}
          component={Link}
          to={`/products/${product.id}`}
          sx={{ textDecoration: "none" }}
        >
          {product.Name}
        </Typography>
      </Stack>
    </Grid>
  );
}

export default function CataloguePage({ selectedCategory, categories }: Props) {
  const allProducts = categories.flatMap((c) => c.products ?? []);
  const filteredProducts = selectedCategory
    ? (categories.find((c) => c.id === selectedCategory)?.products ?? [])
    : allProducts;

  const title =
    selectedCategory
      ? categories.find((c) => c.id === selectedCategory)?.name ?? "Category"
      : "All Categories";

  return (
    <Stack bgcolor="background.default" component="section">
      <Box display="flex" alignItems="center" gap={6} pt={10}>
        <Box flex={1} borderTop="2px solid" borderColor="divider" position="relative">
          <Box
            sx={{
              position: "absolute",
              right: -5,
              top: -4,
              width: 6,
              height: 6,
              bgcolor: "divider",
              borderRadius: "50%",
            }}
          />
        </Box>

        <Typography fontSize={47} fontWeight={700} color="text.primary">
          {title}
        </Typography>

        <Box flex={1} borderTop="2px solid" borderColor="divider" position="relative">
          <Box
            sx={{
              position: "absolute",
              left: -5,
              top: -4,
              width: 6,
              height: 6,
              bgcolor: "divider",
              borderRadius: "50%",
            }}
          />
        </Box>
      </Box>

      {/* Products */}
      <Grid container spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Typography
            fontSize={20}
            color="text.secondary"
            sx={{ textAlign: "center", width: "100%", mt: 5 }}
          >
            No product available
          </Typography>
        )}
      </Grid>
    </Stack>
  );
}
