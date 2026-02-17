"use client";
import { useState, useCallback } from "react";

type PermissionState = "idle" | "requesting" | "granted" | "denied";

interface CameraPermissionProps {
  onGranted: () => void;
}

export default function CameraPermission({ onGranted }: CameraPermissionProps) {
  const [state, setState] = useState<PermissionState>("idle");

  const requestCamera = useCallback(async () => {
    setState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      stream.getTracks().forEach((t) => t.stop());
      setState("granted");
      onGranted();
    } catch {
      setState("denied");
    }
  }, [onGranted]);

  if (state === "denied") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-4">
        <p className="text-red-400 text-lg">Camera access denied</p>
        <p className="text-gray-400 text-sm">
          Enable camera in browser settings and reload
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-6">
      <h1 className="text-2xl font-bold">MemoryLink AR</h1>
      <p className="text-gray-400">Scan a Polaroid. Unlock memories.</p>
      <button
        onClick={requestCamera}
        disabled={state === "requesting"}
        className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
      >
        {state === "requesting" ? "Requesting..." : "Enable Camera"}
      </button>
    </div>
  );
}
