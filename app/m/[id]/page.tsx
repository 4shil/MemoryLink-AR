"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CameraPermission from "@/components/CameraPermission";
import ARViewport from "@/components/ARViewport";
import DigitalStack from "@/components/DigitalStack";
import ScanningOverlay from "@/components/ScanningOverlay";

interface MemoryData {
  id: string;
  title: string;
  memories: Array<{
    id: string;
    type: "photo" | "video";
    url: string;
    caption?: string;
  }>;
}

export default function MemoryPage() {
  const params = useParams();
  const memoryId = params.id as string;

  const [cameraGranted, setCameraGranted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [memoryData, setMemoryData] = useState<MemoryData | null>(null);

  // Fetch memory data based on ID
  useEffect(() => {
    // Mock data - in production, fetch from API/database
    const mockMemories: Record<string, MemoryData> = {
      seniors_farewell: {
        id: "seniors_farewell",
        title: "Senior Farewell",
        memories: [
          {
            id: "m1",
            type: "video",
            url: "/assets/videos/farewell.mp4",
            caption: "Best moments together",
          },
          {
            id: "m2",
            type: "photo",
            url: "/assets/photos/photo1.jpg",
            caption: "Class photo",
          },
          {
            id: "m3",
            type: "photo",
            url: "/assets/photos/photo2.jpg",
            caption: "Fun times",
          },
        ],
      },
    };

    setMemoryData(mockMemories[memoryId] || mockMemories.seniors_farewell);
  }, [memoryId]);

  if (!cameraGranted) {
    return <CameraPermission onGranted={() => setCameraGranted(true)} />;
  }

  if (!memoryData) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Loading memories...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <ARViewport
        memoryId={memoryData.id}
        mediaUrl={memoryData.memories[0]?.url || ""}
        mediaType={memoryData.memories[0]?.type || "photo"}
        onTrackingFound={() => setIsTracking(true)}
        onTrackingLost={() => setIsTracking(false)}
      />

      <ScanningOverlay isTracking={isTracking} />
      <DigitalStack memories={memoryData.memories} isTracking={isTracking} />
    </div>
  );
}
