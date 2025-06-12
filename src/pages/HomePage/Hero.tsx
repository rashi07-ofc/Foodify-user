import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import foodImg from "../../assets/thali.jpg";

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    // px-4 py-20 bg-white text-cente
    <section className="bg-white px-4 py-20 xl:px-70 grid grid-cols-1 md:grid-cols-2 items-center gap-14 min-h-[80vh]" id="home">
  {/* Left Text */}
  <div className="text-left" data-aos="fade-right">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
      Fresh Food <br /> Delivered to Your Door
    </h2>
    <p className="text-gray-600 text-base md:text-lg mb-8">
      Order delicious meals from your favorite restaurants and get them
      delivered hot and fresh in no time. Fast, reliable, and tasty.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="bg-red-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition">
        Order Now
      </button>
      <button className="border border-red-500 text-red-500 font-semibold px-6 py-3 rounded-full hover:bg-red-50 transition">
        Browse Menu
      </button>
    </div>
  </div>

  {/* Right Image */}
  <div className="relative flex justify-center items-center w-full h-full" data-aos="fade-left">
    <img
      src={foodImg}
      alt="Delicious food"
      className="w-[300px] h-[350px] md:w-[400px] md:h-[450px] object-cover rounded-2xl shadow-2xl"
    />
  </div>
</section>

  );
}
