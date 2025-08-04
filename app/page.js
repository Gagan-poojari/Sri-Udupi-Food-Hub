'use client'
import dynamic from "next/dynamic";
import BookMenuCard from "./components/BookMenuCard";
import HeroSection from "./components/HeroSection";
// import Map from "./components/Map";

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
})

export default function Home() {

  return (
    <>
      <HeroSection />
      <div className="h-[2px] bg-[#00000011] w-full"></div>
      <BookMenuCard />
      <div className="h-[2px] bg-[#00000011] w-full"></div>
      <Map />
    </>
  );
}
