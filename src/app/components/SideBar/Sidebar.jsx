import React from 'react'
import Cattegory from './Category'
import PopularProducts from './PopularProduct'
import Anons from './Anons'
import NewsList from './NewsList'



export const Sidebar = () => {
    return (
        <div className='flex flex-col gap-7 '>
            <Cattegory />
            <PopularProducts />
            <Anons />
            <NewsList />
        </div>
    )
}

export default Sidebar  