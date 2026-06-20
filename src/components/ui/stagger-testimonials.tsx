import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// Premium real estate testimonials
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Искал пентхаус в центре Киева полгода. LUMIÈRE нашли идеальный вариант за две недели. Сделка прошла незаметно — всё взяли на себя. Теперь каждое утро встречаю с видом на Днепр.",
    by: "Олександр Мельник, CEO",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OleksandrMelnyk&backgroundColor=1a1a2e&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Хотела особняк с закрытой территорией и своим садом. Показали три варианта — все три попали в точку. Выбрать было сложно, но менеджер помог расставить приоритеты. Живу в доме мечты.",
    by: "Вікторія Бондаренко, владелец бизнеса",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ViktoriyaBondarenko&backgroundColor=2d1b69&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "Приобрела виллу как инвестицию. Команда LUMIÈRE подготовила полный анализ рынка, сопроводила юридически. Через год объект вырос на 28%. Работаю с ними постоянно.",
    by: "Ірина Коваленко, инвестор",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=IrynaKovalenko&backgroundColor=0f3460&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "Переезжал из Лондона, нужна была резиденция класса A. LUMIÈRE показали закрытые объекты, которых нет на открытом рынке. Очень ценю приватность и профессионализм команды.",
    by: "Максим Дорошенко, финансист",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MaksymDoroshenko&backgroundColor=16213e&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "Покупал квартиру для жены в подарок. Команда всё организовала конфиденциально и красиво. Вручение стало настоящим сюрпризом. LUMIÈRE — это не агентство, это консьерж-сервис.",
    by: "Андрій Шевченко, предприниматель",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AndriyShevchenko&backgroundColor=533483&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "Долго искала что-то с характером — не типовые метры, а настоящая архитектура. LUMIÈRE предложили объект, о существовании которого я не подозревала. Первый просмотр — сразу согласилась.",
    by: "Наталія Тимошенко, архитектор",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NataliyaTymoshenko&backgroundColor=1b1b2f&textColor=ffffff",
  },
  {
    tempId: 6,
    testimonial:
      "Три покупки через LUMIÈRE за пять лет. Каждый раз — точное попадание в запрос, честная цена и чистая сделка. Другие агентства для меня больше не существуют.",
    by: "Роман Кравченко, девелопер",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RomanKravchenko&backgroundColor=0d0d0d&textColor=ffffff",
  },
  {
    tempId: 7,
    testimonial:
      "Приятно удивила скорость работы. Заявку подала вечером, утром уже был готов список объектов. Закрыли сделку за 10 дней. Профессионалы, которые уважают время клиента.",
    by: "Олена Павленко, юрист",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OlenaPavlenko&backgroundColor=1e3a5f&textColor=ffffff",
  },
  {
    tempId: 8,
    testimonial:
      "Искал загородную резиденцию с конюшней и лесом. Казалось, нереальный запрос для Киева. LUMIÈRE нашли именно это — в 30 минутах от города. Вот что значит знать рынок.",
    by: "Сергій Литвиненко, предприниматель",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SerhiyLytvynenko&backgroundColor=2e4057&textColor=ffffff",
  },
  {
    tempId: 9,
    testimonial:
      "Работала с LUMIÈRE по рекомендации партнёра. Теперь сама рекомендую всем в своём окружении. Это единственное агентство, где чувствуешь себя единственным клиентом.",
    by: "Катерина Руденко, топ-менеджер",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=KaterynaRudenko&backgroundColor=3d2b1f&textColor=ffffff",
  },
  {
    tempId: 10,
    testimonial:
      "Купил апартаменты для дочери на учёбу — хотел лучшее. LUMIÈRE подобрали объект в 5 минутах от университета с консьерж-сервисом. Спокоен за неё полностью.",
    by: "Василь Гончаренко, предприниматель",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=VasylHoncharenko&backgroundColor=1c3144&textColor=ffffff",
  },
  {
    tempId: 11,
    testimonial:
      "Редкий случай, когда агентство думает о тебе, а не о комиссии. Отговорили от двух сомнительных объектов и нашли лучший. Честность — главная ценность LUMIÈRE.",
    by: "Тетяна Власенко, врач",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=TetianaVlasenko&backgroundColor=2b2d42&textColor=ffffff",
  },
  {
    tempId: 12,
    testimonial:
      "Сложная сделка с международным финансированием. LUMIÈRE скоординировали всех участников — банки, нотариусы, юристы. Я просто подписал документы. Высший класс.",
    by: "Дмитро Савченко, банкир",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DmytroSavchenko&backgroundColor=14213d&textColor=ffffff",
  },
  {
    tempId: 13,
    testimonial:
      "Меня привлекла не цена, а репутация. После первой встречи стало ясно — это другой уровень сервиса. Закрытая база объектов, индивидуальный менеджер, полная конфиденциальность.",
    by: "Людмила Захаренко, политик",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=LudmylaZakharenko&backgroundColor=1a0a2e&textColor=ffffff",
  },
  {
    tempId: 14,
    testimonial:
      "Вложил в недвижимость вместо акций. LUMIÈRE дали аналитику по пяти районам и помогли выбрать самый перспективный. Через 18 месяцев доходность превысила прогноз на 15%.",
    by: "Олег Марченко, инвестор",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OlehMarchenko&backgroundColor=0c1b33&textColor=ffffff",
  },
  {
    tempId: 15,
    testimonial:
      "Продавала родительский дом — сложно эмоционально. Команда LUMIÈRE была деликатна и внимательна. Нашли покупателя, который действительно оценил дом. Спасибо за человечность.",
    by: "Аліна Поліщук, дизайнер",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AlinaPolishchuk&backgroundColor=25274d&textColor=ffffff",
  },
  {
    tempId: 16,
    testimonial:
      "Как иностранный покупатель, боялся юридических сложностей. LUMIÈRE сопроводили весь процесс на английском, объяснили каждый нюанс. Сделка прошла без единого вопроса.",
    by: "James Harrington, UK investor",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=JamesHarrington&backgroundColor=1f4068&textColor=ffffff",
  },
  {
    tempId: 17,
    testimonial:
      "Жена хотела терассу с панорамой, я — подземный паркинг. Нашли объект, где есть и то, и другое. До сих пор смеёмся — LUMIÈRE решили наш спор лучше, чем мы сами.",
    by: "Павло та Олена Кириленко",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=PavloKyrylenko&backgroundColor=1d3557&textColor=ffffff",
  },
  {
    tempId: 18,
    testimonial:
      "За 20 лет покупал недвижимость в пяти странах. Сервис LUMIÈRE сравним с лучшими агентствами Монако и Дубая. Если бы они работали по всему миру — пользовался бы только ими.",
    by: "Георгій Остапенко, серийный инвестор",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=GeorgiyOstapenko&backgroundColor=0b132b&textColor=ffffff",
  },
  {
    tempId: 19,
    testimonial:
      "Нужна была квартира рядом с офисом за 3 дня — командировка. LUMIÈRE справились. Объект оказался настолько хорош, что в итоге купил его. Теперь это мой второй дом в Киеве.",
    by: "Антон Федоренко, топ-менеджер",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AntonFedorenko&backgroundColor=222831&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-gray-900 text-white border-gray-900"
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-gray-400",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3 className={cn("text-base sm:text-xl font-medium", isCenter ? "text-white" : "text-gray-900")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-gray-300" : "text-gray-600",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Следующий отзыв"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}