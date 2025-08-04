import React from 'react'
import Link from 'next/link';
import logo from './public/logo.png'
import Image from 'next/image';

const NavBar = () => {

    const links = [
        { id: 1, name: 'HOME', path: '/' },
        { id: 2, name: 'OUR BRANCHES', path: '/syllabus' },
        { id: 3, name: 'ORDER NOW', path: '/pyqpapers' },
        { id: 4, name: 'CONTACT', path: '/coe' },
    ];

    return (
        <nav className='flex items-center justify-between pl-2 pr-7 w-[100%] absolute top-0 left-0 z-50 bg-[#000000ad] navshad '>
            <div className='flex gap-5 font-bold text-[#fff] '>
                {/* Add priority to the Image component */}
                <Image 
                    className='w-[200px] object-cover' 
                    src={logo} 
                    alt="Logo" 
                    priority
                    width={200} 
                    height={100}  // Ensure width and height are set
                />
            </div>

            <div className='flex gap-10 text-[#ffffff]'>
                {links.map((item, index) => (
                    <Link href={item.path} key={index} >
                        <div className='flex flex-col'>
                            <span className='befaft smooth relative hover:text-[#1a8a3d] font-semibold text-[18px]'>
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default NavBar
