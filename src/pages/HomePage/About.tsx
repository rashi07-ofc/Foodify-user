import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import AbtImg from "../../assets/AboutImg.jpg";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="w-full px-4 md:px-16 py-20 bg-white" id="about">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10"
        data-aos="fade-left"
      >
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2">
          <img
            src={AbtImg}
            alt="Delicious Food"
            className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[900px] object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2">
          <p className="text-sm text-orange-500 uppercase tracking-widest font-semibold mb-2">
            About Our Restaurant
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            We Provide Good Food <br /> For Your Family!
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed text-base sm:text-lg">
            At Foodify, we craft meals with care, using fresh ingredients and
            unique recipes. Whether you're craving something healthy or
            indulgent, we bring flavor to every bite.
          </p>
          <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
            Join us in a culinary journey that delights the senses. Our chefs
            blend tradition and creativity to make every dish a memory worth
            savoring.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
