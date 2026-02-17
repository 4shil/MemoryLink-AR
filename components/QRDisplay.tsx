"use client";
import { useEffect, useRef, useState } from "react";
import { generateQRCodeCanvas } from "@/utils/qr";

interface QRDisplayProps {
  memoryId: string;
  title?: string;
}

export default function QRDisplay({ memoryId, title }: QRDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      generateQRCodeCanvas(memoryId, canvas)
        .then(() => setLoading(false))
        .catch(console.error);
    }
  }, [memoryId]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg">
      {title && <h2 className="text-lg font-semibold text-black">{title}</h2>}
      <canvas
        ref={canvasRef}
        className={loading ? "opacity-0" : "opacity-100"}
        width={300}
        height={300}
      />
      <p className="text-sm text-gray-600">
        Scan this code to view memories on any device
      </p>
    </div>
  );
}
