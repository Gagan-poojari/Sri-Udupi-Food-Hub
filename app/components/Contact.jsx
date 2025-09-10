"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-black text-white min-h-screen flex items-center justify-center px-6 py-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl w-full space-y-12 text-center"
      >
        {/* Heading */}
        <motion.div className="space-y-4" variants={fadeInUp} custom={1}>
          <h2 
          // className="text-4xl md:text-5xl font-extrabold text-[#cec284]"
          className="text-4xl md:text-5xl pt-2 lg:mb-10 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
          >
            Contact Us
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Have a question, feedback, or need assistance? We’re here to help.
            Reach out anytime and we’ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 text-gray-300"
          variants={fadeInUp}
          custom={2}
        >
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <FaPhoneAlt className="mx-auto text-[#cec284] text-2xl mb-3" />
            <h3 className="text-white font-semibold mb-1">Call Us</h3>
            <p className="text-sm">+91 98765 43210</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <FaMapMarkerAlt className="mx-auto text-[#cec284] text-2xl mb-3" />
            <h3 className="text-white font-semibold mb-1">Visit Us</h3>
            <p className="text-sm leading-relaxed">
              Sri Udupi Food Hub Commercial Street,
              <br /> 43, Dispensary Rd, Tasker Town,
              <br /> Shivaji Nagar, Bengaluru, Karnataka 560001
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <FaEnvelope className="mx-auto text-[#cec284] text-2xl mb-3" />
            <h3 className="text-white font-semibold mb-1">Email</h3>
            <p className="text-sm">contact@sriudupifoodhub.com</p>
          </div>

        </motion.div>

        {/* Service Hours */}
        <motion.div
          className="text-gray-400 text-sm"
          variants={fadeInUp}
          custom={3}
        >
          <p>
            <span className="text-white font-medium">Service Hours:</span>{" "}
            Monday to Sunday – 7:00 AM to 10:00 PM
          </p>
          <p className="mt-1">We’re open all days including public holidays.</p>
        </motion.div>

        {/* Franchise Note */}
        <motion.div
          className="text-sm text-gray-500 pt-6"
          variants={fadeInUp}
          custom={4}
        >
          For franchise or bulk catering inquiries, please email us directly.
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
