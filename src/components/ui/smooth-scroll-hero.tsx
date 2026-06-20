import type * as React from "react"
import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

interface SmoothScrollHeroProps {
  scrollHeight?: number
  desktopImage: string
  mobileImage: string
  initialClipPercentage?: number
  finalClipPercentage?: number
  onCtaClick?: () => void
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1875,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  onCtaClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [40, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{ clipPath, willChange: "clip-path" }}
      >
        {/* Desktop background — статичная картинка */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Mobile background */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          {/* Logo — точная копия из HeroSection */}
          <div className="flex items-center gap-2.5 mb-10">
            <svg
              width="36" height="36" viewBox="0 0 28 28" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none"/>
              <polygon points="14,6 22,10 22,18 14,22 6,18 6,10" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none"/>
              <circle cx="14" cy="14" r="2.5" fill="rgba(255,255,255,0.9)"/>
              <line x1="14" y1="6" x2="14" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
              <line x1="14" y1="17" x2="14" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
              <line x1="6" y1="10" x2="11.5" y2="13" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
              <line x1="16.5" y1="15" x2="22" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
              <line x1="22" y1="10" x2="16.5" y2="13" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
              <line x1="11.5" y1="15" x2="6" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
            </svg>
            <span className="text-white font-bold text-xl tracking-[0.2em]">LUMIÈRE</span>
          </div>

          {/* CTA Button */}
          <LiquidButton
            size="xxl"
            className="font-bold text-xl tracking-wide"
            onClick={onCtaClick}
          >
            ОСТАВИТЬ ЗАЯВКУ
          </LiquidButton>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero
