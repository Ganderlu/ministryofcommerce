"use client";
import { Box, Container, Typography, Stack } from "@mui/material";

const NigeriaFlag = () => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      width: 22,
      height: 16,
      flexShrink: 0,
      borderRadius: "2px",
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(15,23,42,0.15)",
    }}
    aria-label="Nigeria flag"
  >
    <Box sx={{ width: "33.33%", height: "100%", backgroundColor: "#008751" }} />
    <Box sx={{ width: "33.33%", height: "100%", backgroundColor: "#FFFFFF" }} />
    <Box sx={{ width: "33.34%", height: "100%", backgroundColor: "#008751" }} />
  </Box>
);

export default function TopBar() {
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", py: 1.5 }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          spacing={1.5}
        >
          <NigeriaFlag />
          <Typography
            variant="body2"
            sx={{
              color: "black",
              fontSize: { xs: "0.78rem", sm: "0.875rem" },
              fontWeight: 500,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Welcome to the official website of Anambra State Ministry of Commerce, Industry and Trade..
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
