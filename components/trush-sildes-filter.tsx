"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Eye } from "lucide-react"
import Image from "next/image"


interface TruthSliderProps {
  filteredImage: string
  truthImage: string
  className?: string
}

export function TruthSlider({ filteredImage, truthImage, className }: TruthSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // slider position in percentage (0 to 100)
  const sliderPos = useMotionValue(50)
  const springPos = useSpring(sliderPos, { stiffness: 300, damping: 30 })
  const clipPath = useTransform(springPos, (pos) => `inset(0 ${100 - pos}% 0 0)`)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    sliderPos.set((x / rect.width) * 100)
  }

  const onMouseDown = () => setIsDragging(true)
  const onMouseUp = () => setIsDragging(false)
  const onMouseMove = (e: React.MouseEvent) => isDragging && handleMove(e.clientX)

  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative aspect-4/5 overflow-hidden rounded-3xl cursor-ew-resize select-none shadow-2xl ${className}
      `}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
    >
      {/* Filtered Image (Base) */}
      <Image
        src={filteredImage || "/placeholder.svg"}
        alt="Filtered"
        className="absolute inset-0 h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 864px"
        fill
        priority
        quality={90}
      />

      {/* Truth Image (Overlay) */}
      <motion.div style={{ clipPath }} className="absolute inset-0 z-10">
        <Image
          src={truthImage || "/placeholder.svg"}
          alt="Truth Revealed"
          className="absolute inset-0 h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 864px"
          fill
          priority
          quality={90}
        />

        {/* Truth Label */}
        <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
          <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
            <Eye className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-slate-800">Truth Revealed</span>
        </div>
      </motion.div>

      {/* Slider Handle */}
      <motion.div
        style={{ left: useTransform(springPos, (p) => `${p}%`) }}
        className="absolute top-0 bottom-0 w-1 bg-white z-30 -translate-x-1/2"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-indigo-500/20">
          <div className="w-7 h-7 bg-teal-600 rounded-full flex items-center justify-center text-white">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Label Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/30 text-white text-sm font-medium">
        Drag to reveal the truth
      </div>
    </div>
  )
}
