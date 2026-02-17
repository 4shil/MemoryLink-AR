"use client";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (memoryId: string) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          // Extract memory ID from URL like /m/abc123
          const match = decodedText.match(/\/m\/([a-zA-Z0-9_-]+)/);
          if (match) {
            scanner.stop();
            onScan(match[1]);
          }
        },
        () => {} // ignore scan failures
      )
      .catch((err: Error) => setError(err.message));

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <p className="text-lg mb-4 font-semibold">Scan QR Code</p>
      <div id="qr-reader" className="w-72 h-72 rounded-lg overflow-hidden" />
      {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      <p className="text-gray-500 mt-4 text-xs">
        Point camera at the QR code on your Polaroid
      </p>
    </div>
  );
}
