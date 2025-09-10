import Image from 'next/image'
import React from 'react'
import logo from '../../assets/logo/shopNow.png'

export default function Logo() {
    return (
        <div className='w-12 h-8 md:w-16 md:h-12 lg:w-20 lg:h-16'>
            <Image className='w-full h-full' src={logo} alt="Shop Now Logo" width={150} height={50} />
        </div>
    )
}