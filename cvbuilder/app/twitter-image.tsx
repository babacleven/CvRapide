import { ImageResponse } from "next/og";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, OgCard } from "./og-card";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return new ImageResponse(<OgCard />, { ...size });
}
