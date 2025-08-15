import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 1,
        bgcolor: "rgba(255, 192, 204, 0.1)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        zIndex: 10,
        textAlign: 'left',
        color: 'text.primary',
        letterSpacing: '0.5px',
        py: 2,
        px: 6
      }}
    >
      <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
        <Typography fontSize={18} fontWeight={700}>SwiftCommerce</Typography>
        <Typography fontSize={9} fontWeight={400} lineHeight={0.5} pl={10}> by : SwiftXR </Typography>
      </Box>
    </Box>
  );
}

export default Header;
