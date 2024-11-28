import React, { useState, useEffect, useCallback } from "react"
import { Star } from "lucide-react"
import confetti from "canvas-confetti";

import StarRatingProps from "@/types/StarRatingProps.ts";
import { useGetRate } from "@/hooks/book/useGetRate.ts";
import { useRate } from "@/hooks/book/useRate.ts";
import { useAuth0 } from "@auth0/auth0-react";

export default function StarRating({ title = "Your rating", initialRating = 0, ratable = false, small = false, onChange, bookId = "" }: StarRatingProps = {}) {
  const { user, loginWithRedirect, isLoading: authLoading } = useAuth0();
  const { data: userRating } = useGetRate(bookId, ratable);
  const [rating, setRating] = useState(ratable && userRating ? userRating : initialRating)
  const { mutate: rateBook } = useRate(bookId);
  const [hover, setHover] = useState<number>(0)
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);
  useEffect(() => {
    if (ratable) {
      setRating(userRating);
    }
  }, [userRating, ratable]);
  const handleClick = useCallback((index: number) => {
    if (!ratable) return;
    if (authLoading) return;
    if (!user?.sub) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    }

    const newRating = hover === index + 0.5 ? index + 0.5 : index + 1
    rateBook(newRating);
    setRating(newRating)
    if (onChange) {
      onChange(newRating)
    }
  }, [authLoading, hover, loginWithRedirect, onChange, ratable, rateBook, user?.sub])
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
    rateBook(0);
    if (onChange) {
      onChange(0)
    }
  }, [onChange, ratable, rateBook])

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
          <div className="flex justify-between text-lg lg:text-lg">
            <h3 className="">{title}</h3>
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
                className={`${small ? "size-5" : "size-6 md:size-8"} text-gray-300 dark:text-gray-500 `}
                fill="currentColor"
              />
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                <Star
                  className={`${small ? "size-5" : "size-6 md:size-8 "} text-yellow-400 `}
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