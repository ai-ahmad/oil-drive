import React from 'react'
import Cattegory from './Category'
import PopularProducts from './PopularProduct'
import Anons from './Anons'
import NewsList from './NewsList'
import Feedback from './Feedback'
import Statistic from './Statistic'



export const Sidebar = () => {
    return (
        <aside className='flex flex-col gap-7 xl:max-w-[250px] md:max-w-[40%] w-full '>
            <Cattegory />
            <PopularProducts />
            <Anons />
            <NewsList />
            <Feedback />
            <Statistic />
        </aside>
    )
}

export default Sidebar  