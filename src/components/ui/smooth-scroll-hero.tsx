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

  const scale = useTransform(scrollYProgress, [0, 0.7], [1.08, 1])

  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{ clipPath, willChange: "transform" }}
      >
        {/* Desktop background — только parallax, без Ken Burns */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />
        {/* Mobile background */}
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/50" />

        {/* CTA Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <div className="text-center text-white max-w-3xl mx-auto px-6">

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <svg width="36" height="36" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <span className="text-white font-bold text-2xl tracking-[0.2em]">LUMIÈRE</span>
            </div>

            {/* Heading */}
            <div className="overflow-hidden mb-5">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wider leading-none"
              >
                ГОТОВЫ НАЙТИ
                <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  ДОМ МЕЧТЫ?
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
            >
              Закрытые объекты, персональный подбор и сопровождение сделки под ключ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <LiquidButton
                size="xxl"
                className="font-bold text-xl tracking-wide"
                onClick={onCtaClick}
              >
                ОСТАВИТЬ ЗАЯВКУ
              </LiquidButton>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero
