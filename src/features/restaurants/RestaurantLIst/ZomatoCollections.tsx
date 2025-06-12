import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  clearFilters,
  setNameFilter,
  setCityFilter,
  setMinRatingFilter,
} from "../../../redux/slice/Filters";
import type { RootState } from "../../../redux/store";
import { CiFilter } from "react-icons/ci";
import Delivery from "./Delivery";
import Collections from "./Collections";
import FAQSection from "./FAQSection";
import CardOne from "./CardOne";

import { restaurantsData } from "../../../data/restaurants.ts";

const ZomatoCollections: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const dispatch = useDispatch();
  const { filteredRestaurants, filters } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    dispatch(applyFilters(restaurantsData));
  }, [dispatch, filters]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCityFilter(e.target.value));
  };

  const handleMinRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinRatingFilter(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  const navigate = useNavigate();


  return (
    <>
      <div
        className="home-container w-full h-[75vh] bg-cover bg-center flex items-center justify-center font-poppins"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1555992336-03a23cbe4c92?auto=format&fit=crop&w=1950&q=80")`,
        }}
      >
        <div
          className="home-banner-container flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mx-4 p-8 rounded-3xl shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #FF9D59 80%, #FFAA66 100%)",
            boxShadow: "0 10px 32px 0 rgba(0,0,0,0.10)",
          }}
        >
          <div className="home-text-section flex flex-col items-start justify-center w-full max-w-md">
            <h1
              className="primary-heading text-left font-extrabold italic text-4xl md:text-5xl text-white drop-shadow-lg mb-4"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Your Favourite Food Delivered Hot & Fresh
            </h1>
            <p
              className="primary-text text-left italic text-lg md:text-xl text-white/90 mb-6"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Healthy switcher chefs do all the prep work, like peeling,
              chopping & marinating, so you can cook a fresh food.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                className={`bg-white font-bold italic px-8 py-3 rounded-full shadow-lg transition duration-200 text-lg flex items-center
                  ${activePage === 0 ? "text-orange-600 ring-2 ring-orange-400" : "text-orange-500"}
                `}
                onClick={() => setActivePage(0)}
              >
                <span className="mr-2">🍴</span>
                Dining Out
              </button>
              <button
                className={`bg-white font-bold italic px-8 py-3 rounded-full shadow-lg transition duration-200 text-lg flex items-center
                  ${activePage === 1 ? "text-orange-600 ring-2 ring-orange-400" : "text-orange-500"}
                `}
                onClick={() => setActivePage(1)}
              >
                <span className="mr-2">🛵</span>
                Delivery
              </button>
            </div>
          </div>

          <div className="home-image-section flex justify-end w-full max-w-lg ml-0 md:ml-8 mt-8 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1606755962773-3b5fd97c8574?auto=format&fit=crop&w=800&q=80"
              alt="Delicious hot meal"
              className="w-80 h-80 md:w-[26rem] md:h-[26rem] object-cover rounded-2xl shadow-xl"
              style={{
                border: "none",
                background:
                  "linear-gradient(135deg, #FF9D59 80%, #FFAA66 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <div>
        {activePage === 0 ? (
          <>
            <Collections />

            <div className="flex flex-col items-center px-[10vw] py-[100px] w-[100vw] box-border">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1250&q=80"
                alt="Food Collection"
                className="w-[1250px] h-auto"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center items-center my-6">
              <button className="border-2 border-[#FF9D59] text-[#FF9D59] hover:bg-[#FF9D59] hover:text-white font-semibold px-5 py-2 rounded-full transition duration-200 flex items-center gap-2">
                Filters <CiFilter />
              </button>
              <input
                type="text"
                placeholder="Search by name"
                value={filters.name}
                onChange={handleNameChange}
                className="border-2 border-[#FF9D59] focus:border-[#FFAA66] placeholder-[#FFAA66] placeholder-italic text-base px-4 py-2 rounded-full shadow-sm transition-all duration-200 w-48"
              />
              <input
                type="text"
                placeholder="Search by city"
                value={filters.city}
                onChange={handleCityChange}
                className="border-2 border-[#FF9D59] focus:border-[#FFAA66] placeholder-[#FFAA66] placeholder-italic text-base px-4 py-2 rounded-full shadow-sm transition-all duration-200 w-48"
              />
              <input
                type="number"
                placeholder="Min Rating"
                value={filters.minRating}
                onChange={handleMinRatingChange}
                className="border-2 border-[#FF9D59] focus:border-[#FFAA66] placeholder-[#FFAA66] placeholder-italic text-base px-4 py-2 rounded-full shadow-sm transition-all duration-200 w-32"
              />

              <button
                onClick={() => dispatch(setMinRatingFilter(3))}
                className="border-2 border-[#FF9D59] text-[#FF9D59] hover:bg-[#FF9D59] hover:text-white font-semibold px-5 py-2 rounded-full transition duration-200"
              >
                3 Star
              </button>
              <button
                onClick={() => dispatch(setMinRatingFilter(4))}
                className="border-2 border-[#FFAA66] text-[#FFAA66] hover:bg-[#FFAA66] hover:text-white font-semibold px-5 py-2 rounded-full transition duration-200"
              >
                4 Star
              </button>
              <button
                onClick={() => dispatch(setMinRatingFilter(5))}
                className="border-2 border-[#FF9D59] text-[#FF9D59] hover:bg-[#FF9D59] hover:text-white font-semibold px-5 py-2 rounded-full transition duration-200"
              >
                5 Star
              </button>
              <button
                onClick={handleClearFilters}
                className="bg-[#FF9D59] hover:bg-[#FF9D59] text-white font-semibold px-6 py-2 rounded-full shadow transition duration-200"
              >
                Clear
              </button>
            </div>

            <div className="flex flex-col items-start px-5 md:px-[10vw] w-full max-w-[80vw] box-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-2">
                <h2
                  className="text-[32px] text-[#FF9D59] font-semibold mb-2 font-[Dancing Script] italic drop-shadow-lg"
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                  Restaurants in Delhi NCR
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-5 md:px-[10vw]">
  {filteredRestaurants.length > 0 ? (
    filteredRestaurants.map((data) => (
      <div
        key={data.id}
        onClick={() => navigate("/landing")}
        className="cursor-pointer"
      >
        <CardOne
          name={data.name}
          city={data.city}
          price_per_dish={data.price_per_dish}
          timings={data.timings}
          rating={data.rating}
          distance={data.distance}
          coupon_percent={data.coupon_percent}
        />
      </div>
    ))
  ) : (
    <p>No restaurants match your filters.</p>
  )}
</div>


            <FAQSection />
          </>
        ) : (
          <Delivery />
        )}
      </div>
    </>
  );
};

export default ZomatoCollections;
