"use client";

import { useEffect, useState } from "react";

interface LastUpdatedLabelProps {
  fallback: string;
}

/**
 * Renders a client-side "last updated" date. Kept as a separate client
 * component so the parent page can remain a Server Component (and export
 * Next.js metadata). Uses a static fallback for SSR and updates to the
 * current date on the client to avoid hydration mismatches.
 */
export default function LastUpdatedLabel({ fallback }: LastUpdatedLabelProps) {
  const [text, setText] = useState<string>(fallback);

  useEffect(() => {
    setText(
      new Date().toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return <>{text}</>;
}
