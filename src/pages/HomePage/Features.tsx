// src/components/Features.tsx
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Image imports
import Menu from "../../assets/Features-Menu.png";
import Pan from "../../assets/Features-Pan.png";
import Chef from "../../assets/Features-Chef.png";
import Food from "../../assets/Features-Food.png";

const features = [
  {
    title: "Diverse Menus",
    desc: "Choose from a wide selection of cuisines and dishes from local and international restaurants.",
    img: Menu,
  },
  {
    title: "Freshly Prepared",
    desc: "Meals prepared fresh on demand, ensuring quality and taste in every bite.",
    img: Pan,
  },
  {
    title: "Top-Rated Chefs",
    desc: "Our partner restaurants feature chefs renowned for their delicious and authentic recipes.",
    img: Chef,
  },
  {
    title: "Fast Delivery",
    desc: "Quick and reliable delivery to your doorstep, hot and ready to enjoy.",
    img: Food,
  },
];

export default function Features() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="px-4 py-20 bg-white text-center" id="features">
      <h3 className="text-red-500 font-semibold tracking-wider mb-2">FEATURES</h3>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-snug">
        Why Choose Our Food Delivery Service?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-gradient-to-b from-gray-100 via-white to-white rounded-3xl shadow-md p-6 group hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 ease-in-out"
          >
            <div className="flex justify-center">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-20 h-20 object-contain rounded-full shadow"
              />
            </div>
            <h4 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              {feature.title}
            </h4>
            <p className="text-gray-600 mb-4">{feature.desc}</p>
            <a
              href="#"
              className="text-red-500 font-medium inline-flex items-center hover:underline"
            >
              Learn More <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
