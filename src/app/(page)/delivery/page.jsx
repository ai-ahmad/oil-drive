import Navigation from '@/app/components/Navigations/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
  return (
   <>
   <Navigation/>
     <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Доставка товара</h1>
      
      <p className="mb-2">Доставка товара происходит после фактической оплаты. Магазин "OIL TRADE" работает по всему Узбекистану.</p>
      <p className="mb-2">В г.Ташкент и его области доставляем приобретенный Вами товар до склада покупателя.</p>
      <p className="mb-4">В другие города доставка осуществляется через транспортные компании.</p>
      
      <p className="mb-6">
        Уточняйте данную информацию у менеджера интернет магазина в разделе:{' '}
        <Link href="/contact" legacyBehavior>
          <a className="text-blue-600 hover:underline">контакты.</a>
        </Link>
      </p>
      
      <div className="border p-4 inline-block">
        <Image
          src="https://oiltrade.uz/uploads/posts/2020-02/medium/1582641319_flv_watermark.png"
          alt="OilTrade.Uz logo"
          width={300}
          height={150}
          className="mx-auto"
        />
      </div>
    </div>
   </>
  )
}
