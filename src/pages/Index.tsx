import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion, AnimatePresence } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setSubmitted(false)
      setFormData({ name: "", phone: "", comment: "" })
    }, 2500)
  }
  const missionStatement =
    "В LUMIÈRE Estates мы верим: дом — это не просто стены, это пространство для жизни мечты. Мы создаём подборку безупречных объектов премиум-класса для тех, кто ценит архитектуру, приватность и совершенство деталей. От панорамных пентхаусов в сердце города до уединённых вилл у воды — каждый объект в нашем портфолио проходит строгий отбор. Мы не продаём квадратные метры. Мы открываем двери в особый образ жизни, где роскошь становится повседневностью, а каждый рассвет встречаешь в идеальном интерьере."

  const timelineEntries = [
    {
      id: 1,
      image: "https://cdn.poehali.dev/projects/90021b2f-cfcd-4983-91d1-868b6823b8bb/files/5acffee2-9c46-4015-9b16-dc7233659dde.jpg",
      alt: "Вилла с панорамным остеклением и бассейном",
      title: "Виллы у воды",
      description:
        "Безупречная архитектура, бесконечный бассейн и панорама, от которой захватывает дух. Наши виллы — это приватность, простор и инженерное совершенство для тех, кто привык к лучшему. Готовы увидеть свой будущий дом?",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "https://cdn.poehali.dev/projects/90021b2f-cfcd-4983-91d1-868b6823b8bb/files/6fb67afd-4898-4da2-a88c-df8522a2a140.jpg",
      alt: "Пентхаус с панорамой города",
      title: "Пентхаусы в небе",
      description:
        "Город у ваших ног, мраморные интерьеры от ведущих дизайнеров и панорамное остекление в пол. Эти резиденции для тех, кто ценит статус, высоту и абсолютный комфорт в сердце мегаполиса.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://cdn.poehali.dev/projects/90021b2f-cfcd-4983-91d1-868b6823b8bb/files/19cef11a-be15-4790-865f-204ca7c298c9.jpg",
      alt: "Элитный особняк в сумерках",
      title: "Особняки с историей",
      description:
        "Камень, стекло и безупречный ландшафт. Наши особняки сочетают монументальность и уют, создавая пространство, где хочется жить поколениями. Закрытая территория, приватность и архитектура высшего класса.",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection onCtaClick={() => setIsModalOpen(true)} />

      {/* Mission Statement Section with Grid Background */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-gray-900">НАША ФИЛОСОФИЯ</h2>
            <TextGradientScroll
              text={missionStatement}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-800"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="community" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">ИЗБРАННЫЕ ОБЪЕКТЫ</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Каждый объект — это отдельная история. Вот лишь несколько резиденций из нашего эксклюзивного портфолио.
              </p>
            </div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
              Что говорят наши{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">КЛИЕНТЫ</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Реальные отзывы покупателей, которые нашли дом мечты вместе с LUMIÈRE Estates.
            </p>
          </motion.div>

          <StaggerTestimonials />
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="relative py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white mb-4">КОНТАКТЫ</h2>
            <p className="text-gray-400 text-lg tracking-wide">Мы всегда на связи</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {[
              {
                icon: "Phone",
                label: "Телефон",
                value: "+380 44 200 11 88",
                href: "tel:+380442001188",
              },
              {
                icon: "Send",
                label: "Telegram",
                value: "@lumiere_estates",
                href: "https://t.me/lumiere_estates",
              },
              {
                icon: "Instagram",
                label: "Instagram",
                value: "@lumiere.estates.kyiv",
                href: "https://instagram.com/lumiere.estates.kyiv",
              },
              {
                icon: "MapPin",
                label: "Адрес офиса",
                value: "вул. Хрещатик, 15, оф. 8, Київ",
                href: "https://maps.google.com/?q=Khreshchatyk+15+Kyiv",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 bg-gray-900/50 hover:bg-gray-900"
                style={{ clipPath: "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% 100%, calc(100% - 16px) 100%, 16px 100%, 0 100%, 0 0)" }}
              >
                <div className="w-12 h-12 flex items-center justify-center border border-gray-700 group-hover:border-gray-500 transition-colors mb-5">
                  <Icon name={item.icon} size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs tracking-widest uppercase text-gray-600 mb-2">{item.label}</p>
                <p className="text-white text-sm font-medium leading-relaxed">{item.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-xs tracking-widest uppercase mb-6">Пн – Сб · 9:00 – 20:00</p>
            <LiquidButton
              size="xxl"
              className="font-bold text-xl tracking-wide"
              onClick={() => setIsModalOpen(true)}
            >
              ОСТАВИТЬ ЗАЯВКУ
            </LiquidButton>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white w-full max-w-md relative"
              style={{ clipPath: "polygon(30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, calc(100% - 30px) 100%, 30px 100%, 0 100%, 0 0)" }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <Icon name="X" size={20} />
              </button>

              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Check" size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black tracking-wider text-gray-900 mb-3">ЗАЯВКА ПРИНЯТА</h3>
                  <p className="text-gray-600">Наш менеджер свяжется с вами в течение 30 минут</p>
                </div>
              ) : (
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-black tracking-wider text-gray-900 mb-2">ЗАПИСАТЬСЯ НА ПРОСМОТР</h3>
                  <p className="text-gray-500 text-sm mb-8">Оставьте контакты — мы подберём удобное время</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Ваше имя</label>
                      <input
                        required
                        type="text"
                        placeholder="Олександр Мельник"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b-2 border-gray-200 focus:border-gray-900 outline-none py-3 text-gray-900 text-base transition-colors bg-transparent placeholder:text-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Телефон</label>
                      <input
                        required
                        type="tel"
                        placeholder="+380 XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border-b-2 border-gray-200 focus:border-gray-900 outline-none py-3 text-gray-900 text-base transition-colors bg-transparent placeholder:text-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Пожелания (необязательно)</label>
                      <textarea
                        rows={3}
                        placeholder="Тип объекта, район, бюджет..."
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full border-b-2 border-gray-200 focus:border-gray-900 outline-none py-3 text-gray-900 text-base transition-colors bg-transparent placeholder:text-gray-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white font-bold tracking-widest text-sm uppercase py-4 hover:bg-gray-700 transition-colors duration-300 mt-4"
                    >
                      Отправить заявку
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><Icon name="Lock" size={12} /> Полная конфиденциальность</span>
                    <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} /> Ответ за 30 мин</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Scroll Hero with CTA Overlay */}
      <section id="join" className="relative">
        <SmoothScrollHero
          scrollHeight={2500}
          desktopImage="https://res.cloudinary.com/dm2xsvsg7/image/upload/v1781968576/ChatGPT_Image_20_%D0%B8%D1%8E%D0%BD._2026_%D0%B3._18_15_51_nwi7mv.png"
          mobileImage="https://res.cloudinary.com/dm2xsvsg7/image/upload/v1781968576/ChatGPT_Image_20_%D0%B8%D1%8E%D0%BD._2026_%D0%B3._18_15_51_nwi7mv.png"
          initialClipPercentage={30}
          finalClipPercentage={70}
          onCtaClick={() => setIsModalOpen(true)}
        />
      </section>
    </div>
  )
}