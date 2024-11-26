"use client"

import { CSSProperties, ReactElement, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

interface SparklesTextProps {
  as?: ReactElement
  className?: string
  text: string
  sparklesCount?: number
  colors?: {
    first: string
    second: string
  }
}

export default function SparklesText({
                                       text,
                                       colors = { first: "#9E7AFF", second: "#FE8BBB" },
                                       className,
                                       sparklesCount = 10,
                                       ...props
                                     }: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateStar = (): Sparkle => {
      const starX = `${Math.random() * 100}%`
      const starY = `${Math.random() * 100}%`
      const color = Math.random() > 0.5 ? colors.first : colors.second
      const delay = Math.random() * 2
      const scale = Math.random() * 1 + 0.3
      const lifespan = Math.random() * 10 + 5
      const id = `${starX}-${starY}-${Date.now()}`
      return { id, x: starX, y: starY, color, delay, scale, lifespan }
    }

    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar)
      setSparkles(newSparkles)
    }

    const updateStars = () => {
      setSparkles((currentSparkles) =>
          currentSparkles.map((star) => {
            if (star.lifespan <= 0) {
              return generateStar()
            } else {
              return { ...star, lifespan: star.lifespan - 0.1 }
            }
          })
      )
    }

    initializeStars()
    const interval = setInterval(updateStars, 100)

    return () => clearInterval(interval)
  }, [colors.first, colors.second, sparklesCount])

  return (
      <div
          className={cn("text-6xl font-bold", className)}
          {...props}
          style={
            {
              "--sparkles-first-color": `${colors.first}`,
              "--sparkles-second-color": `${colors.second}`,
            } as CSSProperties
          }
      >
      <span className="relative inline-block">
        {sparkles.map((sparkle) => (
            <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <strong>{text}</strong>
      </span>
      </div>
  )
}

function Sparkle({ id, x, y, color, delay, scale }: Sparkle) {
  return (
      <motion.svg
          key={id}
          className="pointer-events-none absolute z-20"
          initial={{ opacity: 0, left: x, top: y }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, scale, 0],
            rotate: [75, 120, 150],
          }}
          transition={{ duration: 0.8, repeat: Infinity, delay }}
          width="21"
          height="21"
          viewBox="0 0 21 21"
      >
        <path
            d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 13.5916 6.39157 14.7 7.5C15.8084 8.60843 18.0077 9.59935 19.4797 10.1382L21.3561 10.8253C21.9858 11.0553 21.9858 11.9447 21.3561 12.1747L19.4797 12.8618C18.0077 13.4007 15.8084 14.4006 14.7 15.5C13.5916 16.5994 12.4006 18.7987 11.8618 20.2708L11.1746 22.1472C10.9446 22.7758 10.0553 22.7758 9.82531 22.1472L9.13819 20.2708C8.59932 18.7987 7.40843 16.5994 6.3 15.5C5.19157 14.4006 2.99225 13.4007 1.52023 12.8618L-0.356186 12.1747C-0.984852 11.9447 -0.984852 11.0553 -0.356186 10.8253L1.52023 10.1382C2.99225 9.59935 5.19157 8.60843 6.3 7.5C7.40843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
            fill={color}
        />
      </motion.svg>
  )
}

