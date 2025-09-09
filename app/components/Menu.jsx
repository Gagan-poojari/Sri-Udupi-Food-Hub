"use client";
import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect } from "react";
import menuData from "../data/sufh_menu_with_images08manual.json";
import Image from "next/image";
import logo from "./public/logo.png"; // public folder import
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const chunkArray = (arr, size) => {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );
};

// Single Page Component (Memoized)
const Page = React.memo(
  React.forwardRef(({ content, selcat }, ref) => (
    <div
      ref={ref}
      className="w-full h-full bg-gradient-to-b from-[#cec284] via-[#cec284] to-[#cec284] p-6 rounded-2xl shadow-xl shadow-[#00000048] flex flex-col justify-between items-center gap-4 cursor-grab"
    >
      {/* Image Section */}
      {/* <div className="w-full h-[250px] rounded-xl overflow-hidden border border-[#decba4] shadow-xl">
        <Image
          src={content.image}
          alt={content.name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 shadow-xl"
        />
      </div> */}

      {/* Text Section */}
      <div className="text-center w-full space-y-2">
        <h3 className="text-xl font-bold mt-5 text-[#384b38]">
          {content.name}
        </h3>
        <p className="text-base font-semibold text-[#7c6f53] bg-[#fdf8ec] inline-block px-4 py-1 rounded-full border border-[#e6ddc5] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#fff7e6] hover:shadow-md hover:border-[#d4c295]">
          ₹{content.price}
        </p>
      </div>
    </div>
  ))
);
Page.displayName = "Page";

export default function Menu() {
  const categories = [...new Set(menuData.map((section) => section.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const selectedSection = menuData.find(
    (section) => section.category === selectedCategory
  );

  // ✅ Group items so each page shows 6 dishes
  const chunkedItems = chunkArray(selectedSection?.items || [], 9);

  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div
      id="menu"
      className="lg:min-h-screen max-h-screen bg-[#000000] flex flex-col lg:flex-row items-stretch"
    >
      {/* Sidebar (Desktop) */}
      <aside className="lg:flex hidden flex-col items-center gap-4 overflow-y-auto menu-scrollbar bg-[#1f1f1f] py-6 px-10 max-w-xs w-full z-10">
        <h2 className="text-2xl font-bold text-[#cec284] mb-6 tracking-wider">
          Menu Categories
        </h2>
        <ul className="space-y-3 w-full">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-center transition-all duration-300 relative font-semibold text-lg tracking-wide py-2 px-4 rounded-lg ${selectedCategory === category
                  ? "text-white scale-105 bg-[#cec284]/20 shadow-inner shadow-[#cec284]/20"
                  : "text-[#cec284] hover:text-white hover:bg-[#cec284]/10"
                  }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden w-full bg-[#1f1f1f] pr-6 py-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-[#cec284] pl-4">Menu</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#cec284] font-bold text-2xl"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex">
          <div className="bg-[#1f1f1f] z-50 py-6 px-12 flex flex-col gap-4 shadow-lg overflow-y-auto menu-scrollbar">
            <h2 className="text-2xl font-bold text-[#cec284] mb-4">
              Menu Categories
            </h2>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-center transition-all duration-300 relative font-semibold text-lg tracking-wide py-2 px-4 rounded-lg ${selectedCategory === category
                      ? "text-white scale-105 bg-[#cec284]/20 shadow-inner shadow-[#cec284]/20"
                      : "text-[#cec284] hover:text-white hover:bg-[#cec284]/10"
                      }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Click outside to close */}
          <div
            className="flex-1"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}

      {/* Flipbook Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <h1 className="text-4xl md:text-5xl pt-2 lg:mb-10 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
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
          {/* Cover Page */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#cec284] via-[#cec284] to-[#cec284] text-center text-sm px-7 py-20 rounded-2xl shadow-xl shadow-[#00000048]">

            <h1 className="text-3xl font-bold text-[#384b38] mb-4">
              {selectedCategory.toUpperCase()}
            </h1>
            <div className="flex items-center justify-center">
              <Image
                src={logo}
                width={300}
                height={100}
                alt="logo"
                className="rounded-lg my-4 w-[200px] object-cover"
              />
            </div>
            <p className="text-sm font-bold text-[#384b38]">
              Click to explore the {selectedCategory} section
            </p>
          </div>

          {/* Menu Items */}
          {/* {selectedSection?.items.map((item, idx) => (
            <Page
              key={idx}
              content={item}
              selcat={selectedCategory}
            />
          ))} 
          */}

          {chunkedItems.map((group, pageIdx) => (
            <div
              key={pageIdx}
              className="w-[300px] h-[400px] bg-gradient-to-b from-[#cec284] via-[#cec284] to-[#cec284]
                     p-6 rounded-2xl shadow-md  shadow-[#00000048] flex flex-col gap-3"
            >
              {group.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-[#e6ddc5] pb-1 mb-3 last:border-none"
                >
                  <span className="text-base font-semibold text-[#384b38]">
                    {item.name}
                  </span>
                  <span className="text-base font-bold text-[#7c6f53]">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* Thank You Page */}
          <div className="bg-gradient-to-b from-[#cec284] via-[#cec284] to-[#cec284] text-center text-sm px-7 py-14 rounded-2xl shadow-xl shadow-[#00000048] flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src={logo}
                width={300}
                height={100}
                alt="logo"
                className="rounded-lg mt-5 w-[200px] object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold text-[#384b38] my-10">
              THANK YOU
            </h1>
            <p>Explore more of our menu categories</p>
          </div>
        </HTMLFlipBook>
      </main>
    </div>
  );
}
