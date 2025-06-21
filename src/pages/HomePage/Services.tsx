import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChefHat, Utensils, Soup } from "lucide-react";

const services = [
  {
    icon: <ChefHat className="h-24 w-24 text-orange-500 mb-4" />,
    title: "Top Restaurants",
    description:
      "Partnered with the best-rated restaurants in your city to bring you premium meals at your doorstep.",
  },
  {
    icon: <Utensils className="h-24 w-24 text-orange-500 mb-4" />,
    title: "Hygienic Food",
    description:
      "Every dish is prepared and packed with strict hygiene protocols to ensure your safety and satisfaction.",
  },
  {
    icon: <Soup className="h-24 w-24 text-orange-500 mb-4" />,
    title: "Instant Delivery",
    description:
      "Fast and efficient delivery system that gets your food to you hot, fresh, and right on time.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="w-full py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p
          className="text-sm text-orange-500 uppercase tracking-wider font-semibold mb-2"
          data-aos="fade-up"
        >
          What We Offer
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12"
          data-aos="fade-up"
        >
          Our Best Delivery Services
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 mt-4 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
