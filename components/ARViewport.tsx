"use client";
import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

interface ARViewportProps {
  memoryId: string;
  mediaUrl: string;
  mediaType: "video" | "photo";
  onTrackingFound?: () => void;
  onTrackingLost?: () => void;
}

export default function ARViewport({
  memoryId,
  mediaUrl,
  mediaType,
  onTrackingFound,
  onTrackingLost,
}: ARViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarRef = useRef<any>(null);
  const cleanupRef = useRef(false);

  const initAR = useCallback(async () => {
    if (!containerRef.current || cleanupRef.current) return;

    // Dynamic import to avoid SSR issues
    const { MindARThree } = await import("mind-ar/dist/mindar-image-three.prod.js");

    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: `/assets/target.mind`,
    });

    mindarRef.current = mindarThree;

    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    // Create overlay plane
    let material: THREE.MeshBasicMaterial;

    if (mediaType === "video") {
      const video = document.createElement("video");
      video.src = mediaUrl;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";

      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

      anchor.onTargetFound = () => {
        video.play();
        onTrackingFound?.();
      };
      anchor.onTargetLost = () => {
        video.pause();
        onTrackingLost?.();
      };
    } else {
      const texture = new THREE.TextureLoader().load(mediaUrl);
      material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

      anchor.onTargetFound = () => onTrackingFound?.();
      anchor.onTargetLost = () => onTrackingLost?.();
    }

    // Plane geometry sized to match Polaroid inner frame (roughly 0.85 aspect)
    const geometry = new THREE.PlaneGeometry(1, 0.85);
    const plane = new THREE.Mesh(geometry, material);
    anchor.group.add(plane);

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }, [mediaUrl, mediaType, onTrackingFound, onTrackingLost]);

  useEffect(() => {
    cleanupRef.current = false;
    initAR();

    return () => {
      cleanupRef.current = true;
      if (mindarRef.current) {
        mindarRef.current.stop();
      }
    };
  }, [initAR]);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen"
      style={{ position: "fixed", top: 0, left: 0 }}
    />
  );
}
