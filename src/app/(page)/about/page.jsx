"use client"
import Navigation from '@/app/components/Navigations/Header'
import React from 'react'

const Page = () => {
  return (
  <>
  <Navigation/>
      <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">О магазине</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Давайте познакомимся?</h2>
        <p>
          Мы это не просто интернет магазин, мы это помощник поставщику и потребителю найти друг друга. Oil Trade - построй свою
          любовь к экономии времени!)
        </p>
        <p>
          Теперь благодаря нашей идеи совместить первый интернет магазин в котором вы сможете найти любой смазочный материал
          для ваших нужд. Вы будете не только экономить время на покупках, а так же находить самые выгодные предложения. Больше не
          нужно искать определённый бренд масла который Вам советует завод изготовителя или инженер, за Вас всё сделает OilTrade.Uz.
        </p>
      </section>

      <section className="space-y-4">
        <p>
          Большой ассортимент моторных, гидравлических, компрессорных, редукторных масел, а так же масел теплоносителей АМТ-300 и
          смазок видов: (Литол 24, Солидол, ЕР-1, ЕР-2 и другие, у нас вы сможете найти масла таких брендов как
          (Лукойл, Castrol, Mobil 1, Shell, Q8Oils, GNV OIL, Delkor, Роснефть, Газпромнефть, Татнефть, Kixx, ZIC, Wolf, Total, Mannol, Hyundai, S-Oil,
          X-Oil и другие) и это всё Oil Trade - всё идёт как по маслу.
        </p>
      </section>

      <section className="space-y-4">
        <p className="font-semibold">
          OIL TRADE – это магазин с одной большой полкой в которой можно найти всё самое нужное для Вашего оборудования, техники и
          автомобиля!
        </p>
        <p>
          Мы предлагаем полный спектр масел и смазочных материалов различных брендов, лучших мировых производителей: таких как
          Shell, Mobil, Castrol, а так же тех кто только завоёвывает нишу что бы быть среди них, такие бренды как: Лукойл, Q8Oils, GNV OIL и
          другие.
        </p>
      </section>

      <section className="space-y-4">
        <p>
          Мы предлагаем масла разных типов, "Гидравлические масла, компрессорные масла, редукторные масла, масла теплоносители,
          моторные масла, дизельные масла, масла теплоносители, вакуумные масла.
        </p>
        <p>
          Смазки различных типов: "Литол 24, солидол Ж, графитные смазки, канатные смазки, медно графитные смазки, циатим,смазки 1-
          13, смазки ЖРО, пластичные смазки ЕР-00, смазка ЕР-1, смазка  ЕР-2, смазка  ЕР-3 и другие.
        </p>
      </section>

      <section className="space-y-4">
        <p>Если нужного Вам товара нет в каталоге, мы закажем его в максимально быстрые сроки.</p>
        <p>У нас работают увлеченные профессионалы, поэтому Вас ждут только грамотные консультации.</p>
        <p>Наши менеджеры помогут не только приобрести товар, но и подскажут с лучшим выбором.</p>
        <p>Мы любим свое дело, а потому открыты с 9:00 до 18:00 – обращайтесь в любое удобное для Вас время.</p>
        <p>Мы ценим Ваше удобство. Доставка заказов – работает с приятной быстротой.</p>
        <p>Срок доставки по всему Узбекистану составляет 1-3 дня (в зависимости от региона и удаленности).</p>
        <p>И, наконец, для наших постоянных покупателей – гибкая система подарков и скидок. Присоединяйтесь!</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Наши преимущества:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Широкий ассортимент – все основные направления и бренды;</li>
          <li>Только профессиональная консультация и помощь при покупке;</li>
          <li>Возможность заказа товара, которого нет в каталоге;</li>
          <li>Максимально быстрое обслуживание (доставка по всему Узбекистану в течение 1-3 дней);</li>
          <li>Только актуальная информация на сайте;</li>
          <li>Бонусная система для постоянных покупателей;</li>
          <li>Делать покупки в Oil Trade – легко, быстро и удобно.</li>
        </ul>
      </section>
    </div>
  </>
  )
}

export default Page