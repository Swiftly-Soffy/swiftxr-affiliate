import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Stack, Box, Typography, Grid, Button } from "@mui/material";

import Iconify from "../components/Iconify/iconify";
import { useResponsiveViewContext } from "../components/providers";

import type { Category, Product } from "./related/type";
import { getLikedProducts, toggleLikedProduct } from "../utils/Likes";
import { markProductAsViewed, getViewedProducts } from "../utils/Views";


import Bg from "../assets/bg.png"
import BgPic from "../assets/bgPic.png"


const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  selectedCategory: number | null;
  categories: Category[];
};

function ProductCard({ product }: { product: Product }) {
  const { isMobile } = useResponsiveViewContext();

  const navigate = useNavigate();
  const [liked, setLiked] = useState(getLikedProducts().includes(product.documentId));
  const [likesCount, setLikesCount] = useState(product.Likes ?? 0);
  const [viewsCount] = useState(product.Views ?? 0);

  // Handle Likes
  const handleLikes = async () => {
    const updated = toggleLikedProduct(product.documentId);
    setLiked(updated.includes(product.documentId));

    const newLikes = liked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikes);

    await axios.put(`${apiUrl}/api/products/${product.documentId}`, {
      data: { Likes: newLikes },
    });
  };

  //Handle Views
  const handleProductClick = async (product: Product) => {
    const alreadyViewed = getViewedProducts().includes(product.documentId);

    if (!alreadyViewed) {
      await axios.put(`${apiUrl}/api/products/${product.documentId}`, {
        data: { Views: (product.Views ?? 0) + 1 },
      });
      markProductAsViewed(product.documentId);
    }

    navigate(`/products/${product.slug}`);
  };

  return (
    <Grid size={isMobile ? 12 : 4}>
      <Stack
        spacing={0.5}
        sx={{
          width: 1,
          p: 3,
          height: 1,
          position: "relative",
          "&:hover .hover-button": {
            opacity: 1,
            transform: "translate(-50%, -70%)",
          },
        }}
      >
        {/* Product Image and like */}
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.neutral",
            width: '100%',
            height: 220,
            borderRadius: 5,
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: 0.3,
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              padding: '8px'
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
              p: 0.5,
              position: "absolute",
              top: 8,
              right: 10,
            }}
          >
            <Iconify
              icon={liked ? "gridicons:heart" : "ri:heart-3-line"}
              onClick={handleLikes}
              width={25}
              sx={{
                cursor: "pointer",
                color: liked ? "#E21B1B" : "text.neutral",
              }}
            />
          </Box>
        </Box>

        {/* StoreName */}
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

        {/* ProductName */}
        <Typography
          fontSize={20}
          color="text.primary"
          fontWeight={600}
          noWrap
          sx={{
            textDecoration: "none",
            maxWidth: "100%",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.Name}
        </Typography>

        {/* Likes and views count */}
        <Box display="flex" position="relative" flexDirection="row" alignItems="center" justifyContent="flex-start" gap={1}>
          <Typography component="span" bgcolor="background.neutral" p={0.5} borderRadius="50%"
            sx={{
              border: 1,
              borderColor: 'background.paper'
            }}>
            <Iconify icon="ion:heart" sx={{ color: '#E21B1B' }} />
          </Typography>

          <Typography component="span" bgcolor="background.neutral" p={0.5} borderRadius="50%"
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

        {/* Details button */}
        <Box
          className="hover-button"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 300%)",
            opacity: 0,
            transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
            zIndex: 5,
          }}
        >
          <Button
            onClick={() => handleProductClick(product)}
            variant="contained"
            sx={{
              boxShadow: 5,
              background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(255,255,255,1))",
              backdropFilter: "blur(10px)",
              border: 'divider',
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: isMobile ? 3 : 4,
              px: isMobile ? 2 : 3,
              py: isMobile ? 1 : 2.5,
              fontWeight: 600,
              fontSize: isMobile ? 14 : 16,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#fff",
                opacity: 0.9,
              },
            }}
          >
            <Typography
              sx={{
                background: "linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              View details
            </Typography>
          </Button>
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
      <Grid container spacing={1} id="catalogue">
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
