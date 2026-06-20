import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HeroSectionProps {
  onCtaClick?: () => void
}

const HERO_IMAGE = "https://res.cloudinary.com/dm2xsvsg7/image/upload/v1781967158/d461aab7-b492-480e-ad82-8cd1f24ec896_xssu7z.png"

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Sticky nav — стекло при скроле
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { name: "Главная", href: "#hero" },
    { name: "Философия", href: "#mission" },
    { name: "Объекты", href: "#community" },
    { name: "Отзывы", href: "#testimonials" },
    { name: "Контакты", href: "#contacts" },
  ]

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">

      {/* ── Фон: картинка целиком, Ken Burns ── */}
      <motion.img
        src={HERO_IMAGE}
        alt="LUMIÈRE Estates"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{
          opacity: 1,
          scale: [1.06, 1.0, 1.04, 0.99, 1.06],
          x: ["0%", "-1%", "0.8%", "-0.3%", "0%"],
          y: ["0%", "0.8%", "-0.5%", "0.3%", "0%"],
        }}
        transition={{
          opacity: { duration: 1.8, ease: "easeOut" },
          scale: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 28, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Gradient overlay — виньетка + тёмный низ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />

      {/* Light sweep */}
      <div className="absolute inset-0 light-sweep overflow-hidden pointer-events-none" />

      {/* ── STICKY NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-2.5 group"
        >
          {/* SVG-иконка логотипа */}
          <svg
            width="28" height="28" viewBox="0 0 28 28" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:rotate-12"
          >
            <polygon
              points="14,2 26,8 26,20 14,26 2,20 2,8"
              stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none"
            />
            <polygon
              points="14,6 22,10 22,18 14,22 6,18 6,10"
              stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none"
            />
            <circle cx="14" cy="14" r="2.5" fill="rgba(255,255,255,0.9)" />
            <line x1="14" y1="6" x2="14" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
            <line x1="14" y1="17" x2="14" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
            <line x1="6" y1="10" x2="11.5" y2="13" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
            <line x1="16.5" y1="15" x2="22" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
            <line x1="22" y1="10" x2="16.5" y2="13" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
            <line x1="11.5" y1="15" x2="6" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
          </svg>
          <span className="text-white font-bold text-lg tracking-[0.2em]">LUMIÈRE</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white/90 hover:text-white transition-colors duration-300 font-medium tracking-wide pb-1 group text-sm"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Mobile menu btn */}
        <button
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/92 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-2xl font-black tracking-wider hover:text-gray-300 transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-white max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-medium tracking-[0.45em] uppercase text-gray-300 mb-6"
          >
            Преміум нерухомість · Київ
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider leading-none"
            >
              LUMIÈRE
              <br />
              ESTATES
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-light tracking-wide mb-10 text-gray-200"
          >
            Недвижимость, которой восхищаются
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <LiquidButton
              size="xxl"
              className="font-semibold text-lg tracking-wide"
              onClick={onCtaClick}
            >
              ОСТАВИТЬ ЗАЯВКУ
            </LiquidButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/35 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/45 to-transparent origin-top"
        />
      </motion.div>
    </div>
  )
}