"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { ArrowForward, CalendarToday } from "@mui/icons-material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { events } from "@/data/seed";

const MotionCard = motion(Card);

export default function Events() {
  const accentColor = "#D4AF37";
  return (
    <Box sx={{ py: 10, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Events */}
          <Grid item xs={12} lg={8}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "flex-end" }}
              mb={4}
              spacing={3}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: accentColor, fontWeight: 600, letterSpacing: 1 }}
                >
                  UPCOMING EVENTS
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  Upcoming Events
                </Typography>
              </Box>
              <Button
                variant="text"
                endIcon={<ArrowForward />}
                sx={{ color: accentColor, fontWeight: 600 }}
              >
                View All
              </Button>
            </Stack>

            <Stack spacing={3}>
              {events.map((event, index) => (
                <MotionCard
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CardContent sx={{ p: 3, display: "flex", gap: 3, alignItems: "flex-start" }}>
                    <Stack alignItems="center">
                      <Box
                        sx={{
                          backgroundColor: "#fff7ed",
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            color: accentColor,
                            fontWeight: 700,
                            fontFamily: "var(--font-poppins)",
                            lineHeight: 1,
                          }}
                        >
                          {event.date}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: accentColor, fontWeight: 600 }}
                        >
                          {event.month}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, mt: 0.5, fontWeight: 600 }}
                      >
                        {event.day}
                      </Typography>
                    </Stack>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontFamily: "var(--font-poppins)",
                          mb: 1,
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                        <CalendarToday
                          sx={{
                            fontSize: 18,
                            color: theme.palette.text.secondary,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {event.venue}
                        </Typography>
                      </Stack>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: accentColor,
                          "&:hover": { backgroundColor: "#c49f2d" },
                          color: "black",
                        }}
                      >
                        Register Now
                      </Button>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
            </Stack>
          </Grid>

          {/* Invest in Anambra Card */}
          <Grid item xs={12} lg={4}>
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              sx={{
                height: "100%",
                backgroundColor: accentColor,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.1,
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=800&fit=crop)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    mb: 1,
                  }}
                >
                  INVEST IN ANAMBRA
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    mb: 2,
                  }}
                >
                  Endless Opportunities for Growth
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(0,0,0,0.9)", mb: 4 }}>
                  Discover why Anambra is the premier investment destination in Nigeria and Africa.
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderColor: "black",
                    color: "black",
                    alignSelf: "flex-start",
                    "&:hover": { borderColor: "black", backgroundColor: "rgba(0,0,0,0.1)" },
                  }}
                >
                  Explore Opportunities
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
