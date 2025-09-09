'use client';

import React from 'react';
import Link from 'next/link';
import logo from './public/logo.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const links = [
    { name: 'ABOUT US', href: '#aboutus' },
    { name: 'MENU', href: '#menu' },
    { name: 'BRANCHES', href: '#branches' },
    { name: 'ORDER', href: '#order' },
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
      <header className="lg:h-screen bg-[#000000]">
        {/* Navbar */}
        <nav className="w-full bg-black/80 navshad backdrop-blur-sm shadow-md flex items-center justify-between p-4">
        {/* <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-2"> */}
          <Link href="/" className="flex items-center gap-3">
            <Image src='/sufh_logo.svg' alt="Logo" width={100} height={50} className="w-[150px] sm:w-[180px] max-h-[50px] object-cover" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[#cec284] font-medium text-[17px]">
            {links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-lg  relative befaft transition-all duration-200 smooth cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#cec284] text-2xl smooth focus:outline-none"
            >
              {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col items-center gap-4 bg-black/90 backdrop-blur-lg p-6 absolute top-[64px] left-0 w-full z-40 shadow-lg">
            {links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#cec284] text-lg font-medium smooth relative befaft cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}

        {/* Hero Swiper */}
        <section className="h-[50vh] lg:h-[80vh] flex items-center justify-center bg-[#000000] relative">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                  <Image src={src} alt={`Slide ${idx + 1}`} fill className="object-cover w-full h-full" priority />
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
