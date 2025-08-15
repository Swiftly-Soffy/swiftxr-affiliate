import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductCategories } from "../api";
import { Box, Typography } from "@mui/material";

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

export default function CataloguePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProductCategories().then((data) => {
      setCategories(data as Category[]);
    });
  }, []);

  return (
    <Box component={'section'} bgcolor="background.neutral">
      {categories?.map((cat) => (
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
                sx={{ m: 0, 
                  p: 1, 
                  background: 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)', 
                  color: 'white' }}>{product.Name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
