import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      setVelocity(speed);
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Chestnut cursor - no outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-2xl select-none"
        animate={{
          x: mousePosition.x - 96,
          y: mousePosition.y - 96,
          rotate: isHovering ? 360 : 0,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 800,
            damping: 28,
          },
          y: {
            type: "spring",
            stiffness: 800,
            damping: 28,
          },
          rotate: {
            duration: 0.6,
            ease: "easeOut"
          },
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 20,
          }
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
    src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Untitled_Artwork.png"
    alt=""
    className="w-60 h-60 object-contain select-none pointer-events-none"
    draggable={false}
  />
        </motion.div>
      </motion.div>
    </>
  );
}