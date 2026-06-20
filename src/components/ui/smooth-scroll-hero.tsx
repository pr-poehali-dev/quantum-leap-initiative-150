import type * as React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
  onCtaClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Рамка сжимается → картинка раскрывается на весь экран
  const margin = useTransform(scrollYProgress, [0, 0.6], [60, 0])
  const borderRadius = useTransform(scrollYProgress, [0, 0.6], [24, 0])

  // Кнопка появляется когда фото почти раскрылось
  const btnOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])
  const btnY = useTransform(scrollYProgress, [0.45, 0.65], [20, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute overflow-hidden"
          style={{
            top: margin,
            left: margin,
            right: margin,
            bottom: margin,
            borderRadius,
          }}
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
    </div>
  )
}

export default SmoothScrollHero
