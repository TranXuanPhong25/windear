import React, { useState, useCallback } from "react"
import { Star } from "lucide-react"
import confetti from "canvas-confetti";

import StarRatingProps from "@/types/StarRatingProps";



export default function StarRating({ initialRating = 0, ratable = false, onChange }: StarRatingProps = {}) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState<number>(0)
  const handleClick = useCallback((index: number) => {
    if (!ratable) return;
    const newRating = hover === index + 0.5 ? index + 0.5 : index + 1
    setRating(newRating)
    if (onChange) {
      onChange(newRating)
    }
  }, [hover, onChange, ratable])
  const activateConfetti = (e: React.MouseEvent<HTMLDivElement>, hover: number) => {
    if (!ratable) return;
    const defaults = {
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      spread: 360,
      ticks: 30,
      gravity: 0,
      decay: 0.88,
      startVelocity: 20,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: hover * 2 + 1,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: hover / 1.5,
        scalar: 0.85,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };
  const handleClear = useCallback(() => {
    if (!ratable) return;
    setRating(0)
    if (onChange) {
      onChange(0)
    }
  }, [onChange, ratable])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!ratable) return;
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const percent = (event.clientX - left) / width
    setHover(index + (percent > 0.5 ? 1 : 0.5))
  }, [ratable])

  const handleMouseLeave = useCallback(() => {
    if (!ratable) return;

    setHover(0)
  }, [ratable])

  return (
    <div className="relative w-fit font-sans ">
      {
        ratable && (
          <div className="flex justify-between text-lg">
            <h3 className="">Your rating</h3>
            {
              rating != 0 && (
                <h3 onClick={handleClear} className="cursor-pointer">Clear</h3>
              )
            }
          </div>
        )
      }

      <div className="flex items-center justify-center space-x-1 select-none">
        {[...Array(5)].map((_, index) => {
          const fillPercentage = Math.min(100, Math.max(0, ((hover != 0 ? hover : rating) - index) * 100))
          return (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={(e) => {
                handleClick(index);
                activateConfetti(e, hover);
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              <Star
                className="w-8 h-8 text-gray-200"
                fill="currentColor"
              />
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                <Star
                  className="w-8 h-8 text-yellow-400"
                  fill="currentColor"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}