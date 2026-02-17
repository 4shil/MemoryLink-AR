"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface MemoryCard {
  id: string;
  type: "photo" | "video";
  url: string;
  caption?: string;
}

interface DigitalStackProps {
  memories: MemoryCard[];
  isTracking: boolean;
}

export default function DigitalStack({
  memories,
  isTracking,
}: DigitalStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isTracking || memories.length === 0) return null;

  const handleDragEnd = (info: any) => {
    const swipeThreshold = 50;
    const distance = info.offset.x;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (distance < 0 && currentIndex < memories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20">
      <div className="relative w-48 h-56 pointer-events-auto">
        {memories.map((memory, idx) => {
          const offset = idx - currentIndex;
          const isVisible = Math.abs(offset) < 3;

          return isVisible ? (
            <motion.div
              key={memory.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: offset === 0 ? 1 : 0.5,
                y: offset * 10,
                scale: 1 - Math.abs(offset) * 0.05,
                zIndex: memories.length - Math.abs(offset),
              }}
              exit={{ opacity: 0, y: -20 }}
              drag={offset === 0 ? "x" : false}
              dragElastic={0.2}
              onDragEnd={(e, info) => handleDragEnd(info)}
              className="absolute inset-0 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 cursor-grab active:cursor-grabbing"
            >
              {memory.type === "video" ? (
                <video
                  src={memory.url}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={memory.url}
                  alt={memory.caption || "Memory photo"}
                  fill
                  className="object-cover"
                  priority={offset === 0}
                />
              )}
              {memory.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs p-2">
                  {memory.caption}
                </div>
              )}
            </motion.div>
          ) : null;
        })}
      </div>

      {/* Card counter */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {memories.length}
      </div>
    </div>
  );
}
