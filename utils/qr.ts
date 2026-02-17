import QRCode from "qrcode";

export interface MemoryMetadata {
  id: string;
  title: string;
  createdAt: string;
}

/**
 * Generate QR code data URL for a memory
 */
export async function generateQRCode(
  memoryId: string,
  baseUrl: string = "http://localhost:3000"
): Promise<string> {
  const memoryUrl = `${baseUrl}/m/${memoryId}`;
  const qrCodeDataUrl = await QRCode.toDataURL(memoryUrl, {
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 0.95,
    margin: 1,
    width: 300,
  });
  return qrCodeDataUrl;
}

/**
 * Generate QR code as canvas element
 */
export async function generateQRCodeCanvas(
  memoryId: string,
  canvas: HTMLCanvasElement,
  baseUrl: string = "http://localhost:3000"
): Promise<void> {
  const memoryUrl = `${baseUrl}/m/${memoryId}`;
  await QRCode.toCanvas(canvas, memoryUrl, {
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 0.95,
    margin: 1,
    width: 300,
  });
}

/**
 * Create shareable memory link
 */
export function createMemoryLink(
  memoryId: string,
  baseUrl: string = "http://localhost:3000"
): string {
  return `${baseUrl}/m/${memoryId}`;
}

/**
 * Extract memory ID from URL
 */
export function extractMemoryIdFromUrl(url: string): string | null {
  const match = url.match(/\/m\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
