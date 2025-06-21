import React from 'react';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported

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
    <section id="home" className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32"> {/* Added responsive padding and a top offset for fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-24"> {/* Centralized content, improved gap */}
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 lg:space-y-8" data-aos="fade-right"> {/* Adjusted alignment for responsiveness */}
          <p className="text-orange-600 font-bold text-sm sm:text-base tracking-wide uppercase"> {/* Slightly bolder, larger text */}
            Your Meal, One Tap Away
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"> {/* Larger, bolder heading */}
            Delicious Food <br className="hidden sm:inline" />
            Delivered to You!
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0"> {/* Larger body text, constrained width */}
            Welcome to Foodify — your go-to food delivery app. From local favorites to healthy picks, get the best meals brought straight to your door.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 w-full"> {/* Increased gap, ensured full width */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 transition-transform duration-300 hover:scale-105"
              >
                <div className="text-3xl lg:text-4xl leading-none">{feature.icon}</div> {/* Larger icons */}
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">{feature.title}</h4> {/* Slightly larger title */}
                  <p className="text-sm text-gray-600 leading-snug">{feature.desc}</p> {/* Adjusted line height for desc */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end" data-aos="fade-left"> {/* Centered image on mobile, end-aligned on desktop */}
          <img
            src={FoodHero}
            alt="Chef Preparing Food" 
            className="w-full max-w-md md:max-w-full h-auto rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-102"
          />
        </div>
      </div>
    </section>
  );
};

export default FoodifyHero;