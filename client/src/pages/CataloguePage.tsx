import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductCategories } from "../api";
import { Box, Typography, Stack, Grid } from "@mui/material";
import type { ReactNode } from "react";

import { useResponsiveViewContext } from "../components/providers";

interface Image {
  url: string;
  name: string;
}

interface Product {
  id: number;
  Name: string;
  slug: string;
  Image?: Image;
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}
const apiUrl = import.meta.env.VITE_API_URL;

type ProductCardProps = {
  image: ReactNode;
  name: string;
  slug: string;
};

const ProductCard = ({ image, name, slug }: ProductCardProps) => {
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
          {image}
        </Box>

        <Typography
          fontSize={18}
          color="text.primary"
          fontWeight={600}
          component={Link}
          to={`/products/${slug}`}
          sx={{ textDecoration: "none" }}
        >
          {name}
        </Typography>
      </Stack>
    </Grid>
  );
};


export default function CataloguePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProductCategories().then((data) => {
      setCategories(data as Category[]);
    });
  }, []);

  const CONFIG =
    categories?.flatMap((cat) =>
      cat.products?.map((product) => ({
        image: (
          <img
            src={`${apiUrl}${product.Image?.url}`}
            alt={product.Image?.name}
            style={{ width: "100%", borderRadius: 8 }}
          />
        ),
        name: product.Name,
        slug: product.slug,
      }))
    ) ?? [];


  return (
    <Stack bgcolor="background.default" component="section">
      <Box display="flex" alignItems="center" gap={6} pt={10} >
        <Box flex={1} borderTop="2px solid" borderColor="divider" position="relative" >
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
          All Categories
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

      <Grid container spacing={4}>
        {CONFIG.map((data, idx) => (
          <ProductCard {...data} key={idx} />
        ))}
      </Grid>
      {/*{categories?.map((cat) => (
          <Box key={cat.id} mb={5}>
            <Typography
              sx={{
                textAlign: 'left',
                fontWeight: 500,
                fontSize: 24,
                mb: 1.5,
                color: 'text.primary',
                fontStyle: 'italic'
              }}>{cat.name}</Typography>

            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

              {cat.products?.map((product) => (
                <Box
                  key={product.id}
                  component={Link}
                  to={`/products/${product.slug}`}
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    width: '250px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {product.Image?.url && (
                    <Box
                      component="img"
                      src={`${apiUrl}${product.Image.url}`}
                      alt={product.Image.name}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      m: 0,
                      p: 1,
                      background: 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)',
                      color: 'white'
                    }}>{product.Name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}*/}
    </Stack>
  );
}



