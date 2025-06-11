import React, { useState } from "react";
import { foodTypes, outlets, nearbyRestaurants } from "../../../data/delievryData";
import { FaStar } from "react-icons/fa";
import Navbar from "../RestaurantLandingPage/Navbar";
import Footer from "../RestaurantLandingPage/Footer";

const DelieveryLanding: React.FC = () => {
  // State for toggling "Show More" in each section
  const [showMoreFood, setShowMoreFood] = useState(false);
  const [showMoreOutlets, setShowMoreOutlets] = useState(false);
  const [showMoreRestaurants, setShowMoreRestaurants] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-12">
        <Navbar />

        <div className="p-6 space-y-12 bg-gray-50">
          {/* 🔹 Section: Top Food Types */}
          <section>
            <h2 className="text-xl md:text-2xl text-gray-800 mb-4">
              Top Picks for You
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {(showMoreFood ? foodTypes : foodTypes.slice(0, 4)).map(
                (type, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                    style={{ width: "220px", height: "240px" }}
                  >
                    {/* Food Type Image */}
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-4 flex-shrink-0 flex items-center justify-center bg-gray-100">
                      <img
                        src={type.image}
                        alt={type.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Food Type Name */}
                    <p className="text-lg text-gray-800 text-center flex-grow flex items-center justify-center">
                      {type.name}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Toggle Button for Food Types */}
            {foodTypes.length > 4 && (
              <button
                onClick={() => setShowMoreFood(!showMoreFood)}
                className="mt-3 text-blue-600 hover:underline"
              >
                {showMoreFood ? "Show Less" : "Show More"}
              </button>
            )}
          </section>

          {/* 🔹 Section: Popular Outlets */}
          <section>
            <h2 className="text-xl md:text-2xl text-gray-800 mb-4">
              Popular Outlets
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {(showMoreOutlets ? outlets : outlets.slice(0, 4)).map(
                (outlet, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center justify-center"
                    style={{ width: "220px", height: "240px" }}
                  >
                    {/* Outlet Logo */}
                    <div
                      className="h-40 mb-4 flex items-center justify-center w-full"
                      style={{ maxWidth: "150px" }}
                    >
                      <img
                        src={outlet.logo}
                        alt={outlet.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    {/* Outlet Name */}
                    <p className="text-lg font-small text-center text-gray-700 flex-grow flex items-center justify-center">
                      {outlet.name}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Toggle Button for Outlets */}
            {outlets.length > 4 && (
              <button
                onClick={() => setShowMoreOutlets(!showMoreOutlets)}
                className="mt-3 text-blue-600 hover:underline"
              >
                {showMoreOutlets ? "Show Less" : "Show More"}
              </button>
            )}
          </section>

          {/* 🔹 Section: Nearby Restaurants */}
          <section>
            <h2 className="text-xl md:text-2xl text-gray-800 mb-4">
              Restaurants Near You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showMoreRestaurants
                ? nearbyRestaurants
                : nearbyRestaurants.slice(0, 6)
              ).map((res, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  {/* Restaurant Image */}
                  <img
                    src={res.img}
                    alt={res.name}
                    className="h-40 w-full object-cover"
                  />

                  {/* Restaurant Details */}
                  <div className="p-4">
                    <h3 className="text-lg text-gray-800">{res.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {res.rating} •{" "}
                      {res.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Button for Restaurants */}
            {nearbyRestaurants.length > 3 && (
              <button
                onClick={() => setShowMoreRestaurants(!showMoreRestaurants)}
                className="mt-3 text-blue-600 hover:underline"
              >
                {showMoreRestaurants ? "Show Less" : "Show More"}
              </button>
            )}
          </section>
        </div>
      </div>

      {/* Page Footer */}
      <Footer />
    </>
  );
};

export default DelieveryLanding;
