import type { ReactNode } from "react";
import { Grid, Typography, Stack, Box } from "@mui/material";
import { useResponsiveViewContext } from "../providers";

import Iconify from "../Iconify/iconify";

const DescriptionCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  const { isMobile } = useResponsiveViewContext();
  return (
    <Grid size={isMobile ? 12 : 4}>
      <Stack
        spacing={2}
        sx={{
          borderRadius: 2,
          width: 1,
          py: 5,
          height: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Stack
          sx={{
            height: 40,
            width: 40,
            borderRadius: "50%",
            border: 8,
            borderColor: "background.paper",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default",
            overflow: 'hidden',
          }}
        >
          {icon}
        </Stack>

        <Typography fontSize={20} color="text.primary" fontWeight={600} lineHeight={1}>
          {title}
        </Typography>

        <Typography fontSize={14} color="text.secondary" fontWeight={400} width={'70%'}>
          {description}
        </Typography>
      </Stack>
    </Grid>
  );
};


function Footer() {
  const CONFIG = [
    {
      icon: (
        <Iconify
          icon="carbon:cube-view"
          sx={{ width: 30, height: 30, color: "text.primary" }}
        />
      ),
      title: "See Before You Buy",
      description:
        "Preview products in stunning 3D or AR to explore every detail before making a choice.",
    },
    {
      icon: (
        <Iconify
          icon="game-icons:shopping-cart"
          sx={{ width: 30, height: 20, color: "text.primary" }}
        />
      ),
      title: "Seamless Shopping",
      description:
        "Jump straight from immersive views to the seller’s site with one click.",
    },
    {
      icon: (
        <Iconify
          icon="stash:badge-verified-light"
          sx={{ width: 30, height: 30, color: "text.primary" }}
        />
      ),
      title: "Trusted Partners",
      description:
        "All products come directly from verified e-commerce brands and retailers.",
    },
  ];

  return (
    <Stack component="section" bgcolor="background.default">
      <Grid container spacing={4}>
        {CONFIG.map((data, idx) => (
          <DescriptionCard {...data} key={idx} />
        ))}
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{
            width: '95%',
            height: 2,
            margin: 'auto',
            backgroundColor: '#D1D1D1',
          }}
        />
        <Typography fontSize={14} fontWeight={400} color="text.secondary" textAlign="center" py={4}>
          &copy; Copyright swiftXR 2025. All right reserved
        </Typography>
      </Box>
    </Stack>
  );
}

export default Footer;
