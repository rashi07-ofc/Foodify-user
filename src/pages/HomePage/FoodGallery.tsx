// src/components/FoodGallery.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Parallax } from 'react-scroll-parallax';

import GallaryImg1 from "../../assets/FoodGallary1.jpg";
import GallaryImg2 from "../../assets/FoodGallary2.jpg";
import GallaryImg3 from "../../assets/FoodGallary3.jpg";
import GallaryImg4 from "../../assets/FoodGallary4.jpeg";



const dishes = [
  {
    name: "Kofta",
    price: "₹180",
    image: GallaryImg1,
    rowSpan: "row-span-2",
  },
  {
    name: "North Indian",
    price: "₹480",
    image: GallaryImg3,
    rowSpan: "row-span-1",
  },
  {
    name: "Delux Thaal",
    price: "₹200",
    image: GallaryImg2,
    rowSpan: "row-span-2",
  },
  {
    name: "Malai Kofta",
    price: "₹220",
    image: GallaryImg4,
    rowSpan: "row-span-1",
  },
];

const FoodGallery = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    <Parallax speed={-10}>
  <h2 className="text-4xl font-bold text-center">🔥 Trending Today</h2>
</Parallax>
    <section className="py-20 bg-white" id="gallery">
      
      <div className="text-center mb-12 px-4">
        <p className="text-orange-500 uppercase tracking-widest text-sm">
          Our Gallery
        </p>
        <h2 className="text-3xl font-bold">Gallery of our cooked food.</h2>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 auto-rows-[400px] gap-6 px-4 md:px-6 max-w-7xl mx-auto"
        data-aos="fade-up"
      >
        {dishes.map((dish, index) => (
          <div
            key={index}
            className={`relative group overflow-hidden rounded-lg shadow-md ${dish.rowSpan}`}
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
              <p className="mb-3 text-sm">Price: {dish.price}</p>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-full text-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default FoodGallery;
