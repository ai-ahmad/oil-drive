import React from 'react'
import Cattegory from './Category'
import PopularProducts from './PopularProduct'
import Anons from './Anons'
import NewsList from './NewsList'
import Feedback from './Feedback'
import Statistic from './Statistic'



export const Sidebar = () => {
    return (
        <div className='flex flex-col gap-7 '>
            <Cattegory />
            <PopularProducts />
            <Anons />
            <NewsList />
            <Feedback />
            <Statistic />
        </div>
    )
}

export default Sidebar  