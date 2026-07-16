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
} from "@mui/material";
import { ArrowForward, CalendarToday, LocationOn } from "@mui/icons-material";
import { motion } from "framer-motion";
import { events } from "@/data/seed";

const MotionCard = motion(Card);

export default function EventsSection() {
  const accentColor = "#D4AF37";

  return (
    <Box id="events" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{
              color: accentColor,
              fontWeight: 600,
              letterSpacing: 1,
              mb: 2,
              fontSize: { xs: "0.7rem", md: "0.85rem" },
            }}
          >
            UPCOMING EVENTS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Join Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            Don't miss our upcoming events, workshops, and training programs.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <MotionCard
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Stack alignItems="center" spacing={0.5}>
                      <Box
                        sx={{
                          backgroundColor: "#fff7ed",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1.5,
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
                        sx={{ color: "text.secondary", fontWeight: 600 }}
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
                          mb: 1.5,
                          fontSize: { xs: "1.05rem", md: "1.15rem" },
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                        <LocationOn
                          sx={{
                            fontSize: 18,
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
                          fontWeight: 600,
                          px: 3,
                        }}
                      >
                        Register Now
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}