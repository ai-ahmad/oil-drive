'use client';

import React from 'react';
import Image from 'next/image';
import Navigation from '../../components/Navigations/Header'; 

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>; // Fallback UI
    }

    return this.props.children;
  }
}

export default function Payment() {
  return (
    <ErrorBoundary>
      <Navigation />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Оплата и заказ товара</h1>
        
        <p>
          В нашем интернет магазине "OilTrade.uz" Вы можете сделать заказ не выходя из дома, все очень просто, выбираете товар и
          звоните по указанным телефоном +(998) 99-797-48-77
        </p>
        <p>
          Если наш оператор онлайн то пишите ему, после чего он по инструкции продолжит работу по формированию Вашего заказа.
        </p>
        
        <p className="font-semibold">
          Сделать онлайн заказ - Вы можете уже сейчас! Ничего сложного, все на доступном языке.
        </p>
        <p>
          Так-же можете уточнить делая заказ: доставка будет осуществляться поставщиком или же самовывозом.
        </p>
        <p>
          При заказе "самовывоз" Вы можете получить скидку - до 5% если забираете товар самостоятельно непосредственно с магазина
          или склада.
        </p>
        
        <p className="font-semibold">Оплата осуществляется тремя способами:</p>

        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>Перечислением ( <span className="text-red-600">оплата прямым договором через фирму/спотовые биржевые торги</span> )</li>
          <li>Пластиком ( <span className="text-red-600">оплата корпоративной/личной картой UZCARD, HUMO через терминал в магазине</span> )</li>
          <li>Наличные ( <span className="text-red-600">оплата через магазин фирмы с получением кассового чека</span> )</li>
        </ol>
        <p>
          После поступления оплаты - товар можно забрать со склада или делается доставка товара до обговорённой точки назначения.
          Товар без оплаты - не поставляется клиенту.
        </p>
        <p>
          (О других возможностях оплаты или же поставки всегда можно обсудить по контактным номерам на сайте.
        </p>
        
        <p className="font-semibold">
          Интернет магазин "Oil Trade" выходит на новый уровень работы, зачем приезжать когда можно сделать заказ прямо сейчас?
        </p>
        <p className="font-semibold">
          Наш магазин ценит время своих клиентов!
        </p>
        
        <div className="mt-8 border p-4 inline-block">
          <Image
            src="https://oiltrade.uz/uploads/posts/2020-02/medium/1582641319_flv_watermark.png"
            alt="oltrade.uz"
            width={300}
            height={150}
            className="mx-auto"
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
