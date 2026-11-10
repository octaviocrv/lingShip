import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 exige a lista de qualidades permitidas.
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 430, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 240, 320, 480],
  },
};

export default nextConfig;
