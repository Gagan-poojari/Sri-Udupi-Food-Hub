'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import popularItems from '../data/popular_items.json';

const PopularItems = () => {
  return (
    <section
      id="toppicks"
      className="bg-black text-white min-h-screen flex items-center justify-center px-4 md:px-10 py-20 overflow-hidden"
    >
      <div className="max-w-6xl w-full text-center space-y-12">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          // className="text-4xl md:text-5xl font-extrabold text-[#cec284] tracking-tight"
          className='text-4xl md:text-5xl pt-2 lg:mb-10 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
        >
          Popular Picks
        </motion.h2>

        {/* Slideshow */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ 
            type: "progressbar",
            clickable: true }}
          navigation
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          {popularItems.map((food, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
              >
                {/* Poster image */}
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Food name */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#cec284] drop-shadow-lg">
                    {food.name}
                  </h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-xl  font-extrabold text-[#ffffff5f] tracking-tight"
        >
          Browse Our Complete Menu Below
        </motion.h2>
      </div>
    </section>
  );
};

export default PopularItems;
