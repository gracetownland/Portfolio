import React, { useEffect, useState } from "react";
import motorcycle from "./assets/motorcycle.jpg"; // Make sure the image is in the same directory

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const MotorcycleCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Calculate angle based on previous position
      const deltaX = clientX - prevPosition.x;
      const deltaY = clientY - prevPosition.y;
      let newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees

      // Ensure the motorcycle is never upside down (limit between -90° to 90°)
    //   if (newAngle < -90) newAngle = -90;
    //   if (newAngle > 90) newAngle = 90;

      // Smooth out the rotation using linear interpolation
      const smoothAngle = lerp(angle, newAngle, 0.5); // Lower factor = slower rotation

      setPosition({ x: clientX, y: clientY });
      setAngle(smoothAngle);
      setPrevPosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [prevPosition, angle]);

  return (
    <div
      className="fixed pointer-events-none transition-transform duration-200 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        zIndex: 9999,
      }}
    >
      <img src={motorcycle} alt="Motorcycle Cursor" className="w-10 h-10" />
    </div>
  );
};

export default MotorcycleCursor;