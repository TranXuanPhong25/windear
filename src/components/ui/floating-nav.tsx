
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  children

}: {
  children: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

        if(scrollYProgress.get() === 0){
          setVisible(true);
        }
        else
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "sticky top-0 inset-x-0 mx-auto  dark:bg-gray-800 bg-white  z-[5000]",
          ""
        )}
      >
        {children}
        
      </motion.div>
    </AnimatePresence>
  );
};
