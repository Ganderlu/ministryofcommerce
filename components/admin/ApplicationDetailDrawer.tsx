"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Description as DocIcon } from "@mui/icons-material";
import type { AdminCollection } from "@/lib/admin-actions";
import { getApplicationDetail } from "@/lib/admin-actions";
import StatusBadge from "./StatusBadge";

interface ApplicationDetailDrawerProps {
  open: boolean;
  collection: AdminCollection | null;
  id: string | null;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <Box sx={{ mb: 1.6 }}>
      <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: "#1E293B", mt: 0.3, wordBreak: "break-word" }}>
        {value ?? "—"}
      </Typography>
    </Box>
  );
}

export default function ApplicationDetailDrawer({
  open,
  collection,
  id,
  onClose,
}: ApplicationDetailDrawerProps) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !collection || !id) {
      setData(null);
      return;
    }
    let active = true;
    setLoading(true);
    getApplicationDetail(collection, id)
      .then((d) => {
        if (active) setData(d);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [open, collection, id]);

  const info =
    (data?.businessInformation as Record<string, unknown>) ||
    (data?.cooperativeDetails as Record<string, unknown>) ||
    {};
  const status = (data?.status as string) || "Pending";
  const documents = Array.isArray(data?.documents) ? data.documents : [];
  const owners = Array.isArray(data?.owners)
    ? data.owners
    : Array.isArray(data?.ownerDirectors)
    ? data.ownerDirectors
    : [];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: "100%", sm: 480 }, bgcolor: "#F8FAFC" } }}>
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#FFFDF5", borderBottom: "1px solid #E2E8F0" }}>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Application Details</Typography>
          <Typography sx={{ fontSize: 12, color: "#64748B" }}>{collection} · {id?.slice(0, 12)}</Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2.5, overflowY: "auto" }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#FFAA00" }} />
          </Box>
        )}

        {!loading && data && (
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>
                {(info.businessName as string) || (info.cooperativeName as string) || "Untitled"}
              </Typography>
              <StatusBadge status={status as any} size="small" />
            </Box>

            <Box sx={{ bgcolor: "#FFFDF5", borderRadius: "14px", p: 2.3, border: "1px solid #E2E8F0" }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0F172A", mb: 1.6 }}>
                {(info.cooperativeName ? "Cooperative" : "Business")} Information
              </Typography>
              <Field label="Registration Number" value={(data?.registrationNumber as string) || id} />
              <Field label="Category" value={(info.businessCategory as string) || (info.registrationCategory as string)} />
              <Field label="LGA" value={(info.localGovernmentArea as string)} />
              <Field label="Email" value={(info.emailAddress as string) || (info.email as string)} />
              <Field label="Phone" value={(info.phoneNumber as string)} />
              <Field label="Address" value={(info.businessAddress as string) || (info.officeAddress as string)} />
            </Box>

            {owners.length > 0 && (
              <Box sx={{ bgcolor: "#FFFDF5", borderRadius: "14px", p: 2.3, border: "1px solid #E2E8F0" }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0F172A", mb: 1.6 }}>
                  Owners / Directors ({owners.length})
                </Typography>
                {owners.map((o: any, i: number) => (
                  <Box key={i} sx={{ mb: 1.6, pb: 1.6, borderBottom: i < owners.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <Field label="Name" value={o.fullName} />
                    <Field label="Email" value={o.email || o.emailAddress} />
                    <Field label="Phone" value={o.phoneNumber} />
                  </Box>
                ))}
              </Box>
            )}

            {documents.length > 0 && (
              <Box sx={{ bgcolor: "#FFFDF5", borderRadius: "14px", p: 2.3, border: "1px solid #E2E8F0" }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0F172A", mb: 1.6 }}>
                  Uploaded Documents ({documents.length})
                </Typography>
                {documents.map((d: any, i: number) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1 }}>
                    <DocIcon sx={{ fontSize: 18, color: "#FFAA00" }} />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1E293B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {d.name || d.fileName || `Document ${i + 1}`}
                      </Typography>
                      {d.fileUrl && (
                        <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#FFAA00", fontWeight: 500 }}>
                          Open file
                        </a>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {Boolean(data?.createdAt) && <Chip label={"Created: " + new Date(data!.createdAt as any).toLocaleString()} size="small" />}
              {Boolean(data?.submittedAt) && <Chip label={"Submitted: " + new Date(data!.submittedAt as any).toLocaleString()} size="small" />}
              {Boolean(data?.updatedAt) && <Chip label={"Updated: " + new Date(data!.updatedAt as any).toLocaleString()} size="small" />}
            </Box>
          </Stack>
        )}

        {!loading && !data && (
          <Typography sx={{ textAlign: "center", color: "#94A3B8", py: 6 }}>
            No data available.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
