import type * as React from "react"
import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { MapPin, Building2, Award, KeyRound } from "lucide-react"

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

  // Clip path animation - image fully reveals by 70% scroll progress
  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Background size animation - completes when image is fully revealed
  const backgroundSize = useTransform(scrollYProgress, [0, 0.7], ["170%", "100%"])

  // Scale animation - completes when image is fully revealed
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.2, 1])

  // CTA overlay animations - appears earlier and completes by 50%
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{
          clipPath,
          willChange: "transform",
        }}
      >
        {/* Desktop background */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize,
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
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CTA Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{
            opacity: ctaOpacity,
            y: ctaY,
          }}
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            {/* Main CTA Heading — letter by letter reveal */}
            <div className="overflow-hidden mb-4">
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

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed font-medium"
            >
              Доверьте поиск недвижимости тем, кто знает рынок премиум-класса изнутри.
              <br className="hidden md:block" />
              Закрытые объекты, персональный подбор и сопровождение сделки под ключ.
            </motion.p>

            {/* Stats Grid — stagger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: <Building2 className="w-5 h-5 text-white" />, value: "250+", label: "Объектов в портфолио" },
                { icon: <MapPin className="w-5 h-5 text-white" />, value: "15+", label: "Локаций премиум-класса" },
                { icon: <KeyRound className="w-5 h-5 text-white" />, value: "500+", label: "Сделок под ключ" },
                { icon: <Award className="w-5 h-5 text-white" />, value: "12", label: "Лет на рынке" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <LiquidButton
                size="xxl"
                className="font-bold text-xl tracking-wide px-12 py-4 bg-gray-900 hover:bg-gray-800 text-white border-2 border-gray-900 hover:scale-105 transition-all duration-300"
                onClick={onCtaClick}
              >
                ОСТАВИТЬ ЗАЯВКУ
              </LiquidButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              viewport={{ once: true }}
              className="mt-12 pt-6 border-t border-white/20"
            >
              <p className="text-xs text-gray-400 mb-3 font-medium">НАМ ДОВЕРЯЮТ СОСТОЯТЕЛЬНЫЕ ПОКУПАТЕЛИ</p>
              <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300">
                {["ЗАКРЫТЫЕ ОБЪЕКТЫ", "ПОЛНАЯ ПРИВАТНОСТЬ", "СОПРОВОЖДЕНИЕ СДЕЛКИ", "ПЕРСОНАЛЬНЫЙ ПОДБОР"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.08 }}
                    viewport={{ once: true }}
                    className="text-xs font-semibold"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero