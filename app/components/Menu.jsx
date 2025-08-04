import React, { useState } from "react"
import Image from "next/image"
// import menuData from "../data/sufh_menu.json"
import menuData from "../data/sufh_menu_with_images.json"

// const hotBeverages = menu.hotBeverages;

const Menu = () => {

    const categories = [...new Set(menuData.map((section) => section.category))];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const [selectedItemImage, setSelectedItemImage] = useState(categories[0].image);

    const selectedSection = menuData.find(section => section.category === selectedCategory);

    return (
        <div className="w-full min-h-screen bg-[#1e1e1e]">

            <div className="flex h-[105vh] justify-center items-center">

                <div className=" flex flex-col py-[4vw] h-full border-r-[3px] border-[#cec284]">
                    <div className="text-5xl font-bold text-center text-[#cec284] p-2">MENU</div>
                    <div className=" flex justify-between items-center">
                        <div className="w-[25vw] flex flex-col items-center py-7 px-4">
                            <div className="w-[100%] p-4 flex flex-col gap-4 text-[#cec284]">
                                <div className="text-2xl border-2 border-[#cec284] rounded-md font-bold text-center p-2">CATEGORIES</div>
                                <div className="w-[100%] h-[66vh] flex flex-col items-center gap-2 overflow-y-scroll">
                                    <ul className="space-y-2">
                                        {categories.map((category, index) => (
                                            <li
                                                key={index}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`text-center cursor-pointer text-[#cec284] smooth2 relative hover:text-[#ffffff] font-semibold text-[18px] 
                                                    ${selectedCategory === category ? "text-white" : "text-[#cec284]"}`}>
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[100%] flex flex-col justify-center items-center">
                    <div className="flex gap-2">
                        <div className="rounded-lg w-[400px] h-[500px] bg-[#000000] flex flex-col gap-4 py-5 px-7">
                            <div className="font-bold text-center text-lg"> {selectedCategory.toUpperCase()} </div>
                            <div className="flex justify-between font-semibold border-b border-[#547254] sticky top-0 bg-[#cec284] z-10 px-5"> 
                                <span className="w-[60%] text-left">Item</span> 
                                <span className="w-[40%] text-right">Price</span> 
                            </div>
                            <div className="flex flex-col gap-2 overflow-y-auto h-[420px] pr-1">
                                {selectedSection?.items.map((item, id) => (
                                    <div 
                                    key={id} 
                                    onClick={() => setSelectedItemImage(item.image)}
                                    className="flex justify-between items-center cursor-pointer border-2 border-[#547254] rounded-md px-2 py-1" >
                                        <div className="w-[70%] font-medium text-left">{item.name}
                                        </div>
                                        <div className="w-[30%] text-right">₹{item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-r-lg w-[400px] h-[500px] bg-[#547254]">
                            <div className="rounded-lg h-full py-4">
                                {selectedItemImage ? (
                                    <Image src={selectedItemImage} 
                                    width={400} height={500} 
                                    alt={selectedCategory}
                                    className="rounded-lg w-full h-full object-cover " 
                                    />) : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Menu
