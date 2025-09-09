"use client";
import HTMLFlipBook from "react-pageflip";
import React, { useState } from "react";
// import menuData from "../data/sufh_menu.json"
// import menuData from "../data/sufh_menu_with_images.json"
import menuData from "../data/sufh_menu_with_images08manual.json"
import Image from "next/image";
import logo from './public/logo.png';


import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const Page = React.forwardRef(({ title, content, selimg, selcat }, ref) => (
  <div
    ref={ref}
    className="w-full h-full bg-gradient-to-b cursor-grab from-[#cec284] via-[#cec284a2] to-[#cec284] p-6 rounded-2xl shadow-xl shadow-[#00000048] flex flex-col justify-between items-center gap-4"
  >
    {/* Image Section */}
    <div className="w-full h-[250px] rounded-xl overflow-hidden border border-[#decba4] shadow-xl">
      <Image
        src={content.image}
        alt={selcat}
        width={300}
        height={400}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 shadow-xl"
      />
    </div>

    {/* Text Content */}
    <div className="text-center w-full space-y-2">
      {/* Gradient Name */}
      <h3 className="text-xl font-bold mt-5 text-[#384b38]">
        {content.name}
      </h3>

      {/* Animated Price */}
      <p className="text-base font-semibold text-[#7c6f53] bg-[#fdf8ec] inline-block px-4 py-1 rounded-full border border-[#e6ddc5] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#fff7e6] hover:shadow-md hover:border-[#d4c295]">
        ₹{content.price}
      </p>
    </div>
  </div>
));
Page.displayName = "Page";


export default function BookMenuCard() {

  const categories = [...new Set(menuData.map((section) => section.category))];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [selectedItemImage, setSelectedItemImage] = useState(categories[0].image);

  const selectedSection = menuData.find(section => section.category === selectedCategory);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="menu" className="lg:min-h-screen max-h-screen bg-[#f8f8f8] flex flex-col lg:flex-row items-stretch">
    {/* <div id="menu" className="lg:min-h-screen max-h-screen bg-[#f8f8f8] flex flex-col lg:flex-row items-stretch"> */}
      {/* Sidebar */}
      <div className="lg:flex lg:h-screen hidden flex-col items-center lg:gap-4 overflow-y-auto menu-scrollbar navshad bg-[#1f1f1f] py-6 px-10 shadow-2xl max-w-xs w-full scrollbar-thin scrollbar-thumb-[#cec284]/70 scrollbar-track-transparent z-10">
        <h2 className="text-2xl font-bold text-[#cec284] mb-6 tracking-wider">Menu Categories</h2>
        <ul className="space-y-3 w-full overflow-y-auto menu-scrollbar overflow-x-hidden">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`group text-center cursor-pointer transition-all duration-300 relative font-semibold text-lg tracking-wide 
                ${selectedCategory === category
                  ? "text-white scale-105 bg-[#cec284]/20 shadow-inner shadow-[#cec284]/20"
                  : "text-[#cec284] hover:text-white hover:bg-[#cec284]/10"
                } 
                py-2 px-4 rounded-lg`}
            >
              <span className="relative z-10">{category}</span>
              {selectedCategory === category && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-[#cec284] rounded-full animate-pulse" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger for Small Screens */}
      <div className="lg:hidden w-full  bg-[#1f1f1f] pr-10 py-4 flex justify-between items-center shadow-md">
        <h2 className="text-2xl pl-4 font-bold text-[#cec284]">Menu Categories</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#cec284] font-bold text-2xl focus:outline-none cursor-pointer"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Collapsible Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1f1f1f] px-6 py-4 shadow-inner z-40">
          <ul className="space-y-3 px-5">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setMenuOpen(false);
                }}
                className={`text-center cursor-pointer transition-all duration-300 relative font-semibold text-lg tracking-wide 
                  ${selectedCategory === category
                    ? "text-white scale-105 bg-[#cec284]/20 shadow-inner shadow-[#cec284]/20"
                    : "text-[#cec284] hover:text-white hover:bg-[#cec284]/10"
                  } 
                  py-2 px-4 rounded-lg`}
              >
                <span className="relative z-10">{category}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Flipbook Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 ">
        <h1 className="text-4xl md:text-5xl pt-2 lg:mb-10 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] animate-fade-in">
          Explore Our Menu
        </h1>

        <HTMLFlipBook
          key={selectedCategory}
          width={300}
          height={400}
          showCover={true}
          className="rounded-2xl"
          flippingTime={500}
          maxShadowOpacity={0.5}
        >
          <div className="w-[300px] h-[400px] bg-gradient-to-b cursor-grab from-[#cec284] via-[#cec284a2] to-[#cec284] flex items-center justify-center text-center p-5 text-2xl rounded-2xl shadow-xl shadow-[#00000048]">
            
            <h1 className="text-3xl mt-5 font-bold text-[#384b38] ">{selectedCategory.toUpperCase()}</h1>
            <Image src={logo} width={300} height={100} alt="logo" className="rounded-lg my-10 w-[300px] h-[100px] object-cover " />
            <p className="text-sm font-bold text-[#384b38]">Click to explore the {selectedCategory} section</p>
          
          </div>

          {selectedSection?.items.map((item, idx) => (
            <Page key={idx} content={item} selimg={selectedItemImage} selcat={selectedCategory} />
          ))}

          <div className=" bg-gradient-to-b cursor-grab from-[#cec284] via-[#cec284a2] to-[#cec284] text-center text-sm p-7 rounded-2xl shadow-xl shadow-[#00000048]">
            <Image src={logo} width={300} height={100} alt="logo" className="rounded-lg mt-5 w-[300px] h-[100px] object-cover " />
            <h1 className="text-3xl font-bold text-[#384b38] my-10">THANK YOU</h1>
            <p className="">Explore more of our menu categories</p>
          </div>
        </HTMLFlipBook>

      </div>
    </div>
  );
}
