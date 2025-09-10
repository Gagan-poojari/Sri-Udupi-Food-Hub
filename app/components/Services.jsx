"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaGlassCheers, FaBirthdayCake, FaHome, FaConciergeBell, FaLaptop } from "react-icons/fa";

const services = [
  { icon: <FaUtensils />, title: "Corporate Office Parties" },
  { icon: <FaGlassCheers />, title: "Marriage Functions" },
  { icon: <FaBirthdayCake />, title: "Birthday Parties" },
  { icon: <FaHome />, title: "House Warming" },
  { icon: <FaConciergeBell />, title: "All Other Occasions" },
  { icon: <FaLaptop />, title: "Online Services Available" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Services = () => {
  return (
    <section id="services" className=" relative py-20 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          // className="text-4xl sm:text-5xl font-extrabold text-center text-[#cec284] mb-14"
          className="text-4xl md:text-5xl mb-10 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Our Signature Services
        </motion.h2>

        {/* Service Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-white/0 
                         border border-white/10 shadow-lg transition-all duration-500 
                         hover:scale-105 hover:shadow-[#cec284]/40"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#cec284]/10 via-transparent to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 flex flex-col items-center text-center space-y-4">
                <div className="text-4xl text-[#cec284] transition-transform duration-500 group-hover:scale-125">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-[#cec284] transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
