// import React from 'react'
// import Link from 'next/link';
// import logo from './public/logo_transp.png'
// import Image from 'next/image';

// const NavBar = () => {

//     const links = [
//         { id: 1, name: 'HOME', path: '/' },
//         { id: 2, name: 'OUR BRANCHES', path: '/syllabus' },
//         { id: 3, name: 'ORDER NOW', path: '/pyqpapers' },
//         { id: 4, name: 'CONTACT', path: '/coe' },
//     ];

//     return (
//         <nav className='flex items-center justify-between pl-2 pr-7 w-[100%] absolute top-0 left-0 z-50 bg-[#000000ad] navshad '>
//             <div className='flex gap-5 font-bold text-[#fff] '>
//                 {/* Add priority to the Image component */}
//                 <Image 
//                     className='w-[200px] object-cover' 
//                     src={logo} 
//                     alt="Logo" 
//                     priority
//                     width={200} 
//                     height={100}  // Ensure width and height are set
//                 />
//             </div>

//             <div className='flex gap-10 text-[#ffffff]'>
//                 {links.map((item, index) => (
//                     <Link href={item.path} key={index} >
//                         <div className='flex flex-col'>
//                             <span className='befaft smooth relative hover:text-[#1a8a3d] font-semibold text-[18px]'>
//                                 {item.name}
//                             </span>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </nav>
//     )
// }

// export default NavBar


"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/sufh_logo.svg"; 
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
    const links = [
        { id: 1, name: "HOME", path: "/" },
        { id: 2, name: "OUR BRANCHES", path: "/syllabus" },
        { id: 3, name: "ORDER NOW", path: "/pyqpapers" },
        { id: 4, name: "CONTACT", path: "/coe" },
    ];

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Change navbar background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`relative w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between px-4 md:px-10 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/sufh_logo.svg"
                        alt="Logo"
                        width={200}
                        height={100}
                        priority
                        className="object-contain w-[150px] md:w-[200px]"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10 text-white font-semibold">
                    {links.map((item) => (
                        <Link key={item.id} href={item.path}>
                            <span className="relative group cursor-pointer transition-colors duration-300 hover:text-[#1a8a3d]">
                                {item.name}
                                {/* underline animation */}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#1a8a3d] transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-white text-2xl cursor-pointer">
                    {menuOpen ? (
                        <AiOutlineClose onClick={() => setMenuOpen(false)} />
                    ) : (
                        <AiOutlineMenu onClick={() => setMenuOpen(true)} />
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="absolute top-0 left-0 w-full bg-black/90 backdrop-blur-sm flex flex-col items-center gap-8 py-6 text-white text-lg font-semibold transition-all duration-300 md:hidden">
                    {links.map((item) => (
                        <Link
                            key={item.id}
                            href={item.path}
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-[#1a8a3d] transition-colors duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}

        </nav>
    );
};

export default NavBar;
