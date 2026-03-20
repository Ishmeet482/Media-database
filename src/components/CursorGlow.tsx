import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame: number | null = null;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let isMoving = false;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        animFrame = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      }
      // Stop animating when close enough
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        animFrame = requestAnimationFrame(animate);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animFrame !== null) cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-40 w-[400px] h-[400px] rounded-full opacity-[0.07] will-change-transform"
      style={{
        background: "radial-gradient(circle, hsl(35 90% 55% / 0.5) 0%, transparent 70%)",
      }}
    />
  );
};

export default CursorGlow;
