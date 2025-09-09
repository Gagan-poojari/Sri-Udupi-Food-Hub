'use client'
import dynamic from "next/dynamic";
import BookMenuCard from "./components/BookMenuCard";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Menu from "./components/Menu";
import Services from "./components/Services";
import PopularItems from "./components/PopularItems";
// import Map from "./components/Map";

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
})

export default function Home() {

  return (
    <>
      <HeroSection />
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      <AboutUs />
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      <PopularItems />
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      {/* <BookMenuCard /> */}
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      <Menu />
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      <Map />
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      <Services />
      <div className="h-[1px] bg-[#000000d6] w-full"></div>
      <Contact />

    </>
  );
}
