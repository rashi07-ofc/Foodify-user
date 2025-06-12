import React from 'react';
import 'aos/dist/aos.css';

import FoodHero from "../../assets/FoodifyHero.png";

const features = [
  {
    icon: '🚴‍♂️',
    title: 'Fast Delivery',
    desc: 'Get your food delivered hot and fresh at lightning speed.',
  },
  {
    icon: '🥗',
    title: 'Healthy Choices',
    desc: 'Nutritious meals and diet-friendly options at your fingertips.',
  },
  {
    icon: '🏠',
    title: 'From Local Kitchens',
    desc: 'Support your local favorites by ordering from nearby restaurants.',
  },
  {
    icon: '📱',
    title: 'Easy Ordering',
    desc: 'Seamless ordering through our user-friendly app and website.',
  },
];

const FoodifyHero: React.FC = () => {
  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-80 py-30 bg-white"
      data-aos="fade-up"
    >
      {/* Left Side */}
      <div className="md:w-1/2 space-y-6">
        <p className="text-orange-500 font-semibold text-sm tracking-wide">
          Your Meal, One Tap Away
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Delicious Food <br />
          Delivered to You!
        </h1>
        <p className="text-gray-600 text-base leading-relaxed max-w-md">
          Welcome to Foodify — your go-to food delivery app. From local favorites to healthy picks, get the best meals brought straight to your door.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 transition-transform duration-300 hover:scale-105"
            >
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 mb-10 md:mb-0 ml-60" data-aos="fade-left">
        <img
          src={FoodHero}
          alt="Chef"
          className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        />
      </div>
    </section>
  );
};

export default FoodifyHero;
