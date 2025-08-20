import React from "react";
import { Stack, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useResponsiveViewContext } from "../components/providers";
import type { Category, Product } from "./related/type";

import Iconify from "../components/Iconify/iconify";
import { useState, useEffect } from "react";
import axios from "axios";

import Bg from "../assets/bg.png"
import BgPic from "../assets/bgPic.png"

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  selectedCategory: number | null; 
  categories: Category[];
};


function ProductCard({ product }: { product: Product }) {
  const { isMobile } = useResponsiveViewContext();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.Likes ?? 0);
  const [viewsCount, setViewsCount] = useState(product.Views ?? 0);

  // Toggle Likes
  const handleLikes = async () => {
    try {
      const newLikes = liked ? Math.max(likesCount - 1, 0) : likesCount + 1;
      setLikesCount(newLikes);
      setLiked(!liked);

      await axios.patch(`${apiUrl}/api/products/${product.slug}`, {
        data: { Likes: newLikes },
      });
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  // Increment Views once per page load
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const newViews = (product.Views ?? 0) + 1;
        setViewsCount(newViews);

        await axios.patch(`${apiUrl}/api/products/${product.slug}`, {
          data: { Views: newViews },
        });
      } catch (err) {
        console.error("Error incrementing views:", err);
      }
    };

    if (product?.slug) {
      incrementViews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]); 

  return (
    <Grid size={isMobile ? 12 : 4}>
      <Stack
        spacing={0.5}
        sx={{
          width: 1,
          p: 3,
          height: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            width: "100%",
            height: 250,
            borderRadius: 5,
            p: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            },
          }}
        >
          {product.Image ? (
            <img
              src={`${apiUrl}${product.Image.url}`}
              alt={product.Image.name}
              style={{ width: "100%", borderRadius: 5 }}
            />
          ) : (
            <Box sx={{ width: "100%", height: 320, bgcolor: "grey.200", borderRadius: 2 }} />
          )}

          {/* Like Icon */}
          <Box
            sx={{
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 0.7,
              position: "absolute",
              top: 8,
              right: 10,
            }}
          >
            <Iconify
              icon={liked ? "ion:heart" : "ion:heart-outline"}
              onClick={handleLikes}
              sx={{
                cursor: "pointer",
                fontSize: "24px",
                color: liked ? "#E21B1B" : "text.neutral",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ width: 'fit-content' }}>
          <Typography
            fontSize={10}
            color="text.primary"
            fontWeight={700}
            sx={{
              textDecoration: "none",
              bgcolor: 'background.neutral',
              color: '#FF3D8A',
              borderRadius: 10,
              px: 2.5,
              py: 0.7
            }}
          >
            By {product.StoreName}
          </Typography>
        </Box>

        <Typography
          fontSize={18}
          color="text.primary"
          fontWeight={600}
          component={Link}
          to={`/products/${product.slug}`}
          sx={{
            textDecoration: "none",
            "&:hover": { color: '#fd7cb0ff' }
          }}
        >
          {product.Name}
        </Typography>

        {/* Likes count */}
        <Box display="flex" position="relative" flexDirection="row" alignItems="center" justifyContent="flex-start" gap={1}>
          <Typography bgcolor="background.neutral" p={0.5} borderRadius="50%"
            sx={{
              border: 1,
              borderColor: 'background.paper'
            }}>
            <Iconify icon="ion:heart" sx={{ color: '#E21B1B' }} />
          </Typography>

          <Typography bgcolor="background.neutral" p={0.5} borderRadius="50%"
            sx={{
              position: 'relative',
              left: -15,
              border: 1,
              borderColor: 'background.paper'
            }}>
            <Iconify icon="lets-icons:eye-duotone" />
          </Typography>

          <Typography fontSize={14} fontWeight={600}
            sx={{
              position: 'relative',
              left: -10
            }}>
            ( {likesCount} || {viewsCount} )
          </Typography>
        </Box>

      </Stack>
    </Grid>
  );
}

export default function CataloguePage({ selectedCategory, categories }: Props) {
  const { isMobile } = useResponsiveViewContext();

  const allProducts = categories.flatMap((c) => c.products ?? []);
  const filteredProducts = selectedCategory
    ? (categories.find((c) => c.id === selectedCategory)?.products ?? [])
    : allProducts;

  const title =
    selectedCategory
      ? categories.find((c) => c.id === selectedCategory)?.name ?? "Category"
      : "All Categories";


  return (
    <Stack bgcolor="background.default" component="section" mt={isMobile ? -30 : 'auto'}>
      <Box display="flex" alignItems="center" gap={isMobile ? 3 : 6}>
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

        <Typography fontSize={isMobile ? 25 : 47} fontWeight={700} color="text.primary">
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
      <Grid container spacing={2} id="catalogue">
        {filteredProducts.map((product, index) => {
          const rowSize = 4;
          const isAfterThirdRow =
            Math.floor(index / rowSize) === 2 && index % rowSize === 0;

          return (
            <React.Fragment key={product.slug}>
              <ProductCard product={product} />

              {isAfterThirdRow && (
                <Grid size={12}>
                  <Box
                    sx={{
                      width: 'auto',
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      backgroundImage: `url(${Bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 5,
                      p: isMobile ? 4 : 6,
                      minHeight: isMobile ? 300 : 150,
                      color: "text.neutral",
                      flexDirection: isMobile ? 'column' : 'row',
                      textAlign: isMobile ? 'center' : 'auto'
                    }}
                  >
                    {/* Left side */}
                    <Box sx={{ maxWidth: isMobile ? 'auto' : '40%' }}>
                      <Typography fontWeight={700} fontSize={isMobile ? 26 : 30}>
                        See It Before You Buy It
                      </Typography>
                      <Typography fontSize={isMobile ? 13 : 14} fontWeight={400}>
                        Turn every product into an experience. Rotate, zoom, and drop it right into your space—straight from your browser.                    </Typography>
                    </Box>

                    {/* Right side(Image) */}
                    <Box
                      component="img"
                      src={BgPic}
                      alt="BgPic"
                      sx={{
                        maxWidth: isMobile ? '100%' : '40%',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderRadius: 5
                      }}
                    />
                  </Box>
                </Grid>
              )}
            </React.Fragment>
          );
        })}
      </Grid>
      <Box></Box>
      <Box></Box>
      <Box></Box>

      <Box></Box>

    </Stack>
  );
}
