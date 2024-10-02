import React from 'react'
import Cattegory from './Category'
import PopularProducts from './PopularProduct'

export const Sidebar = () => {
    return (
        <div className='flex flex-col gap-[30px]'>
            <Cattegory />
        </div>
    )
}

export default Sidebar  