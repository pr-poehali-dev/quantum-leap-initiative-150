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

  // Картинка раскрывается от центра до полного экрана
  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Контент появляется когда картинка почти раскрылась
  const ctaOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.4, 0.65], [30, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{ clipPath, willChange: "clip-path" }}
      >
        {/* Фон — статичная картинка, растянута на весь экран */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Overlay — виньетка снизу и сверху */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65" />

        {/* Контент поверх картинки */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-between px-6 md:px-10 py-7 md:py-9"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          {/* Лого — вверху слева, как в Hero */}
          <div className="flex items-center gap-2.5">
            <svg
              width="28" height="28" viewBox="0 0 28 28" fill="none"
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
            <span className="text-white font-bold text-lg tracking-[0.2em]">LUMIÈRE</span>
          </div>

          {/* Кнопка — внизу слева */}
          <div className="flex items-end justify-start pb-2">
            <LiquidButton
              size="xxl"
              className="font-bold text-xl tracking-wide"
              onClick={onCtaClick}
            >
              ОСТАВИТЬ ЗАЯВКУ
            </LiquidButton>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero
