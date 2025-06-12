import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import foodImg from "../../assets/thali.jpg";

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="bg-white px-6 sm:px-10 md:px-20 lg:px-70 py-20 md:py-40 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-14 min-h-[80vh]"
      id="home"
    >
      {/* Left Text */}
      <div className="text-left" data-aos="fade-right">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Fresh Food <br /> Delivered to Your Door
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 max-w-md sm:max-w-lg">
          Order delicious meals from your favorite restaurants and get them
          delivered hot and fresh in no time. Fast, reliable, and tasty.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-600 transition">
            Order Now
          </button>
          <button className="border border-orange-500 text-orange-500 font-semibold px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition">
            Browse Menu
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div
        className="relative flex justify-center items-center w-full h-full"
        data-aos="fade-left"
      >
        <img
          src={foodImg}
          alt="Delicious food"
          className="w-72 h-80 sm:w-80 sm:h-96 md:w-[400px] md:h-[450px] object-cover rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
