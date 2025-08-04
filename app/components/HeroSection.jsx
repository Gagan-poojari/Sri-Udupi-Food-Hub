'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from './public/logo.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  const links = [
    { id: 1, name: 'MENU', path: '/menu', to: '#menu' },
    { id: 2, name: 'BRANCHES', path: '/branches', to: '#branches' },
    { id: 3, name: 'DIRECTIONS', path: '/directions', to: '#directions' },
    { id: 4, name: 'ORDER', path: '/order', to: '#order' },
  ];

  const images = [
    '/herobg/herobg1.jpg',
    '/herobg/herobg4.jpg',
    '/herobg/herobg2.jpg',
    '/herobg/herobg3.jpg',
    '/herobg/herobg5.jpg',
    '/herobg/herobg6.jpg',
    '/herobg/herobg7.jpg',
  ];

  const slideContent = [
    { title: 'Taste the Tradition', subtitle: 'Authentic Udupi flavors, served with love' },
    { title: 'From Our Kitchen to Your Heart', subtitle: 'Pure veg, pure bliss — every single bite' },
    { title: 'South Indian Soul Food', subtitle: 'Dosas, Idlis & More — Made Fresh Daily' },
    { title: 'Savor the Spice, Savor the Soul', subtitle: 'Aromatic curries & crispy delights await' },
    { title: 'Your Daily Dose of Delicious', subtitle: 'Healthy. Hearty. 100% Veg.' },
    { title: 'Cravings Meet Their Match', subtitle: 'Dive into our mouthwatering Udupi specials' },
    { title: 'Dine the Divine Way', subtitle: 'Clean, comforting, and completely unforgettable' },
  ];

  return (
    <>
      <header className='h-screen bg-[#000000] hidden md:block '>

        <div className={`sm:right-0 z-50 p-7 relative ${scrolled ? 'fixed top-0 left-0 bg-[#00000050] backdrop-blur-sm shadow-md' : ''}`}>
          <nav className='flex items-center justify-between p-2 pr-7 sm:w-full absolute top-0 left-0 z-50 bg-[#000000a0] backdrop-blur-xl'>

            <Link href="/" className='flex items-center justify-between sm:w-full w-[10%] ml-2 gap-1 font-bold text-[#fff]'>
              <div className='flex items-center gap-2'>

                <Image className='w-[50px] sm:w-[100px] object-cover' src={logo} alt="Logo" priority width={100} height={100} />
                {/* <div className='text-3xl text-[#fff]'>
              SHRI UDUPI FOOD HUB
            </div> */}
              </div>
            </Link>

            <div className="sm:hidden flex items-center gap-5">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                <span className="text-3xl">&#9776;</span> {/* Hamburger Icon */}
              </button>
            </div>

            {/* Desktop Links (by default visible on larger screens) */}
            <div className={`gap-10 text-[#ffffff] hidden lg:flex`}>
              {links.map((item, index) => (
                <a href={item.to} key={index}>
                  <div className='flex flex-col'>
                    <span className='relative befaft font-semibold text-[18px]'>
                      {item.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu (visible only for small and medium screens) */}
          {menuOpen && (
            <div className="sm:hidden flex flex-col items-center bg-[#00000070] p-4 absolute top-16 left-0 w-full">
              {links.map((item, index) => (
                <a href={item.to} key={index} className="py-2 text-[#fff] text-lg relative befaft smooth ">
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <section className="h-[50vh] sm:h-[80vh] pt-10  flex items-center justify-center bg-[#000000] relative">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, EffectCoverflow]}
            className="w-full h-full"
          >
            {images.map((src, idx) => (
              <SwiperSlide
                key={idx}
                className="relative w-[85vw] max-w-4xl h-[75vh] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              >

                <div className="absolute inset-0">
                  <Image
                    src={src}
                    alt={`Slide ${idx + 1}`}
                    fill
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>


                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {slideContent[idx].title}
                  </h2>
                  <p className="text-sm md:text-lg opacity-90">
                    {slideContent[idx].subtitle}
                  </p>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>
        </section>

      </header>
      {/*This is for phone*/}
      <header className='h-[70vh] w-full md:hidden flex flex-col justify-center items-center bg-[#000000] '>
        {/* HeroSection */}
        <div className={`right-0 z-50 p-7 ${scrolled ? 'fixed top-0 left-0 bg-[#00000050] backdrop-blur-sm shadow-md' : ''}`}>
          <nav className='flex items-center justify-between w-full absolute top-0 left-0 z-50 bg-[#00000000]'>

            <Link href="/" className='w-full flex items-center mt-2 justify-center gap-1 font-bold text-[#fff]'>
              {/* Add priority to the Image component */}
              <Image className='w-[150px] object-cover' src={logo} alt="Logo" priority width={200} height={200} />
            </Link>

            {/* Mobile Hamburger Menu */}
            <div className="sm:hidden flex items-center gap-5">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                <span className="text-3xl">&#9776;</span> {/* Hamburger Icon */}
              </button>
            </div>

            {/* Desktop Links (by default visible on larger screens) */}
            <div className={`gap-10 text-[#ffffff] hidden lg:flex`}>
              {links.map((item, index) => (
                <a href={item.to} key={index}>
                  <div className='flex flex-col'>
                    <span className='relative font-semibold text-[18px]'>
                      {item.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu (visible only for small and medium screens) */}
          {menuOpen && (
            <div className="sm:hidden flex flex-col items-center z-50 bg-black p-4 absolute top-16 left-0 w-full">
              {links.map((item, index) => (
                <a href={item.to} key={index} className="py-2 text-white text-lg">
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
        {/* Hero Section with Swiper */}
        <section className="h-[50vh] w-[90vw] mx-5 pb-10 flex items-center justify-center bg-[#000000] relative">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, EffectCoverflow]}
            className="w-full h-full bg-[#000000]"
          >
            {images.map((src, idx) => (
              <SwiperSlide
                key={idx}
                className="relative w-[85vw] max-w-4xl bg-[#000000] h-[75vh] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Slide ${idx + 1}`}
                    fill
                    priority
                    className="object-cover transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold">{slideContent[idx].title}</h2>
                  <p className="text-sm md:text-lg opacity-90">{slideContent[idx].subtitle}</p>
                </div>
              </SwiperSlide>

            ))}
          </Swiper>
        </section>
      </header>
    </>

  );
};

export default HeroSection;
