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
  scrollHeight = 2500,
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

  // Оригинальная clipPath анимация — раскрытие от центра до краёв
  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Кнопка появляется когда фото раскрылось
  const btnOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const btnY = useTransform(scrollYProgress, [0.5, 0.7], [20, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{ clipPath, willChange: "clip-path" }}
      >
        {/* Desktop */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Mobile */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Виньетка снизу */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Кнопка внизу слева */}
        <motion.div
          className="absolute bottom-10 left-6 md:left-10 z-20"
          style={{ opacity: btnOpacity, y: btnY }}
        >
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
