import React from 'react'

const PopularProducts = () => {
    return (
        <div className="w-1/5 min-w-[200px]">
            <div className="w-full bg-[#E0111A] text-white flex items-center p-2">
                <img src='' alt="Menu" className="mr-2" />
                <p className="font-bold">Категории</p>
            </div>

            <div className='w-full bg-white p-[15px] flex gap-1'>
                <div className='w-[50%] h-[140px]'>
                    <div class="relative w-full h-full border overflow-hidden group">
                        <img src="https://oiltrade.uz/uploads/posts/2024-08/thumbs/1725127353_maslo-motornoe-lukojl-m8d_pr47945_1000x1000f.jpg" alt="Product Image" class="w-full h-full object-cover" />
                        <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center  transition-opacity duration-300 group-hover:opacity-0">
                            <h2 class="text-lg font-semibold text-[12px]">Масло гидравлическое</h2>
                            <p class="text-sm text-[12px]">Лукойл ГЕЙЗЕР СТ 32</p>
                        </div>
                    </div>
                </div>
                <div className='w-[50%] h-[140px]'>
                    <div class="relative w-full h-full border overflow-hidden group">
                        <img src="https://oiltrade.uz/uploads/posts/2024-08/thumbs/1725127353_maslo-motornoe-lukojl-m8d_pr47945_1000x1000f.jpg" alt="Product Image" class="w-full h-full object-cover" />
                        <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center  transition-opacity duration-300 group-hover:opacity-0">
                            <h2 class="text-lg font-semibold text-[12px]">Масло гидравлическое</h2>
                            <p class="text-sm text-[12px]">Лукойл ГЕЙЗЕР СТ 32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularProducts