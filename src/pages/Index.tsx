import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"

export default function Index() {
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
      <HeroSection />

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

      {/* Smooth Scroll Hero with CTA Overlay */}
      <section id="join" className="relative">
        <SmoothScrollHero
          scrollHeight={2500}
          desktopImage="https://cdn.poehali.dev/projects/90021b2f-cfcd-4983-91d1-868b6823b8bb/files/7e8a6d46-41ca-4933-af25-0dd63476cf91.jpg"
          mobileImage="https://cdn.poehali.dev/projects/90021b2f-cfcd-4983-91d1-868b6823b8bb/files/7e8a6d46-41ca-4933-af25-0dd63476cf91.jpg"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>
    </div>
  )
}