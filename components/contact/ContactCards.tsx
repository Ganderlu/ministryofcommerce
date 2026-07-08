"use client";
import { Box, Container, Card, CardContent, Typography, Avatar, Link } from "@mui/material";
import { motion } from "framer-motion";
import { contactCards } from "@/data/seed";

const MotionCard = motion(Card);

export default function ContactCards() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 3,
          }}
        >
          {contactCards.map((card, index) => (
            <MotionCard
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    mx: "auto",
                    mb: 2.5,
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    color: "#D4AF37",
                  }}
                >
                  <card.icon sx={{ fontSize: 32 }} />
                </Avatar>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "#1E293B",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  {card.title}
                </Typography>

                <Box sx={{ mb: 2.5 }}>
                  {Array.isArray(card.description) ? (
                    card.description.map((line, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          color: "#64748B",
                          mb: 0.5,
                          lineHeight: 1.6,
                        }}
                      >
                        {line}
                      </Typography>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.6,
                      }}
                    >
                      {card.description}
                    </Typography>
                  )}
                </Box>

                {card.ctaHref ? (
                  <Link
                    href={card.ctaHref}
                    underline="none"
                    sx={{
                      display: "inline-block",
                      fontWeight: 600,
                      color: "#D4AF37",
                      "&:hover": { color: "#C49F2D" },
                    }}
                  >
                    {card.ctaText}
                  </Link>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#D4AF37",
                    }}
                  >
                    {card.ctaText}
                  </Typography>
                )}
              </CardContent>
            </MotionCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
