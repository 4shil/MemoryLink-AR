/**
 * Media optimization utilities for Cloudinary/CDN
 */

export interface MediaAsset {
  url: string;
  type: "photo" | "video";
  size?: "thumb" | "medium" | "full";
}

/**
 * Generate optimized Cloudinary URL (mock implementation)
 * In production, connect to actual Cloudinary account
 */
export function getOptimizedMediaUrl(
  mediaPath: string,
  type: "photo" | "video",
  size: "thumb" | "medium" | "full" = "full"
): string {
  // For now, return the original path
  // In production: use Cloudinary SDK to transform URLs
  // Example: https://res.cloudinary.com/account/image/upload/w_800,q_auto/path

  const sizeMap: Record<string, { width?: number; quality?: string }> = {
    thumb: { width: 300, quality: "auto" },
    medium: { width: 800, quality: "auto" },
    full: { width: 1920, quality: "auto" },
  };

  const config = sizeMap[size];
  return mediaPath; // Return original for now
}

/**
 * Preload media asset
 */
export async function preloadMedia(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Check media format support
 */
export function isMediaSupported(mediaPath: string): boolean {
  const supportedFormats = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "mp4",
    "webm",
    "ogg",
  ];
  const ext = mediaPath.split(".").pop()?.toLowerCase();
  return ext ? supportedFormats.includes(ext) : false;
}

/**
 * Get video thumbnail at timestamp
 */
export function getVideoThumbnail(
  videoUrl: string,
  timestampSeconds: number = 0
): string {
  // Mock implementation
  // In production: use ffmpeg or video provider API
  return videoUrl;
}

/**
 * Calculate optimal video bitrate based on device
 */
export function getOptimalVideoBitrate(): string {
  // Detect connection quality
  if ("connection" in navigator) {
    const conn = (navigator as any).connection;
    const effectiveType = conn?.effectiveType || "4g";

    switch (effectiveType) {
      case "slow-2g":
      case "2g":
        return "480p";
      case "3g":
        return "720p";
      case "4g":
      default:
        return "1080p";
    }
  }
  return "720p"; // Default fallback
}
