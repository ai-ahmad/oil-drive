import React from 'react'
import Cattegory from './Category'
import PopularProducts from './PopularProduct'

const Sidebar = () => {
    return (
        <div className='flex flex-col gap-7 '>
            <Cattegory />
            <PopularProducts />
        </div>
    )
}

export default Sidebar