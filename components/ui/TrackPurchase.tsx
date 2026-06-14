"use client";
import { useEffect } from "react";
import { trackPurchase } from "@/lib/analytics";

export function TrackPurchase({ token }: { token: string }) {
  useEffect(() => {
    trackPurchase(token);
  }, [token]);
  return null;
}
