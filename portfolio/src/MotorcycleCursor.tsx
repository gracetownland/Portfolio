import React, { useEffect, useState } from "react";
import motorcycle from "./assets/motorcycle.jpg";

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const MotorcycleCursor: React.FC = () => {
  // Null until the first real mouse move, so touch devices never see a stuck cursor.
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const deltaX = clientX - prevPosition.x;
      const deltaY = clientY - prevPosition.y;

      // Only update direction if there's significant horizontal movement
      if (Math.abs(deltaX) > 2) {
        setFacingLeft(deltaX < 0);
      }

      // Calculate tilt based on vertical movement relative to horizontal
      // Limit tilt to ±30 degrees for a natural motorcycle lean effect
      let newTilt = 0;
      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        newTilt = Math.atan2(deltaY, Math.abs(deltaX)) * (180 / Math.PI);
        newTilt = Math.max(-30, Math.min(30, newTilt));
      }

      // Smooth out the tilt using linear interpolation
      const smoothTilt = lerp(tilt, newTilt, 0.3);

      setPosition({ x: clientX, y: clientY });
      setTilt(smoothTilt);
      setPrevPosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [prevPosition, tilt]);

  if (!position) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none transition-transform duration-200 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scaleX(${facingLeft ? -1 : 1}) rotate(${tilt}deg)`,
        zIndex: 9999,
      }}
    >
      <img
        src={motorcycle}
        alt=""
        className="w-10 h-10"
      />
    </div>
  );
};

export default MotorcycleCursor;