'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const AboutUs = () => {
  return (
    <section id='aboutus' className="bg-black text-white min-h-screen flex items-center justify-center px-4 md:px-10 py-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl w-full text-center space-y-10"
      >
        <motion.h1
          // className="text-4xl md:text-5xl font-extrabold text-[#cec284] tracking-tight"
          className='text-4xl md:text-5xl lg:mb-10 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
          variants={fadeInUp}
          custom={1}
        >
          About Sri Udupi Food Hub
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
          variants={fadeInUp}
          custom={2}
        >
          Founded in 2010, Sri Udupi Food Hub has become one of Bangalore’s most trusted destinations
          for authentic South Indian vegetarian cuisine. With over a decade of dedication to taste,
          hygiene, and hospitality, we serve thousands of customers daily across our 10+ locations in the city.
        </motion.p>

        <motion.p
          className="text-base text-gray-400 leading-relaxed max-w-3xl mx-auto"
          variants={fadeInUp}
          custom={3}
        >
          From traditional breakfast staples to full-course South Indian meals, our focus remains consistent:
          quality ingredients, time-honored recipes, and efficient service. We’ve proudly served over 4 million meals
          to date and continue to uphold the standards our patrons have come to expect.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center pt-6 text-sm text-gray-300"
          variants={fadeInUp}
          custom={4}
        >
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <p className="text-[#cec284] font-bold">Established</p>
            <p>2010</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <p className="text-[#cec284] font-bold">Meals Served</p>
            <p>4M+</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <p className="text-[#cec284] font-bold">Outlets</p>
            <p>10+ in Bangalore</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <p className="text-[#cec284] font-bold">Hours</p>
            <p>7:00 AM – 10:00 PM</p>
          </div>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500 pt-6"
          variants={fadeInUp}
          custom={5}
        >
          We look forward to welcoming you and making your dining experience memorable.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutUs;
