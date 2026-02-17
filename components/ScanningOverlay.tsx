"use client";

interface ScanningOverlayProps {
  isTracking: boolean;
}

export default function ScanningOverlay({ isTracking }: ScanningOverlayProps) {
  if (isTracking) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-10">
      {/* Scanning frame */}
      <div className="w-64 h-64 relative">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />

        {/* Scanning line animation */}
        <div className="absolute inset-x-0 h-0.5 bg-white/60 animate-scan" />
      </div>

      {/* Instruction text */}
      <p className="absolute bottom-20 text-white/70 text-sm font-medium">
        Point camera at the Polaroid
      </p>
    </div>
  );
}
