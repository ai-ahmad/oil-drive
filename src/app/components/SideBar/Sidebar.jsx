import React from 'react'
import Cattegory from './Cattegory'
import PopularProducts from './PopularProducts'

const Sidebar = () => {
    return (
        <div className='flex flex-col gap-[30px]'>
            <Cattegory />
            <PopularProducts />
        </div>
    )
}

export default Sidebar