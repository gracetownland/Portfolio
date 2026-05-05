import React, { useEffect, useRef } from "react";
import { createScene } from "./growing-vines";

const GrowingVines: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = createScene(canvas);
    scene.start();

    return () => scene.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default GrowingVines;
