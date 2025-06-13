import React, { useEffect, useState, useRef } from "react";
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
import { IoSearchOutline, IoLocationOutline } from "react-icons/io5";
import { MdClear, MdStar } from "react-icons/md";
// import { BiTime } from "react-icons/bi"; // Not used, can be removed
import Delivery from "./Delivery";
import Collections from "./Collections";
import FAQSection from "./FAQSection";
import CardOne from "./CardOne";
import RestaurantCard from "../../../components/RestaurantCard.tsx";

import { restaurantsData } from "../../../data/restaurants.ts";
import useGeolocation from "../../../hooks/useGeolocation.ts";
import { getNearbyRestaurants } from "../../../api/restaurantFetchApi.ts";
import HomeBannerImage from "../../../assets/home-banner-image.jpeg";
import c5 from "../../../assets/c5.png";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer.tsx";

// Define the Restaurant interface to match the API response
interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
  tags: string[];
  rating?: number;
  openingTime?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

const ZomatoCollections: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const [apiRestaurants, setApiRestaurants] = useState<Restaurant[]>([]);
  const [filteredApiRestaurants, setFilteredApiRestaurants] = useState<
    Restaurant[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { filteredRestaurants, filters } = useSelector(
    (state: RootState) => state.filter
  );

  const { location, error: locationError, getLocation } = useGeolocation();

  // Flag to track if the API has been called
  const hasFetchedRestaurants = useRef(false);

  // 1. Call getLocation once on mount
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array: runs only once

  // 2. Fetch restaurants ONLY when location is available OR geolocation fails
  useEffect(() => {
    // Only proceed if location or locationError has a value AND we haven't fetched yet
    // This ensures the API call happens exactly once after location is determined (or failed).
    if (!hasFetchedRestaurants.current && (location?.lat || locationError)) {
      const fetchRestaurants = async () => {
        setLoading(true);
        setError(null);
        try {
          const latitude = location?.lat || 12.97; // Use actual location or static fallback
          const longitude = location?.lon || 77.59; // Use actual location or static fallback

          const demoLocation = {
            latitude,
            longitude,
            offset: 1,
            limit: 10,
          };

          console.log("Calling API with location:", demoLocation);
          const restaurants = await getNearbyRestaurants(demoLocation);
          console.log("Nearby Restaurants fetched:", restaurants);
          setApiRestaurants(restaurants || []);

          // Set the ref to true after a successful or attempted fetch
          hasFetchedRestaurants.current = true;
        } catch (err) {
          console.error("Error fetching nearby restaurants:", err);
          setError("Failed to fetch restaurants from API");
          setApiRestaurants([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRestaurants();
    }
  }, [location, locationError]); // Depend on location and locationError

  // This useEffect applies filters to static data, not directly related to the API call count
  useEffect(() => {
    dispatch(applyFilters(restaurantsData));
  }, [dispatch, filters]);

  useEffect(() => {
    if (apiRestaurants.length > 0) {
      const filtered = apiRestaurants.filter((restaurant) => {
        const nameMatch =
          !filters.name ||
          restaurant.name.toLowerCase().includes(filters.name.toLowerCase());

        const cityMatch =
          !filters.city ||
          restaurant.address.toLowerCase().includes(filters.city.toLowerCase());

        const ratingMatch =
          !filters.minRating ||
          (restaurant.rating &&
            restaurant.rating >= parseFloat(filters.minRating));

        return nameMatch && cityMatch && ratingMatch;
      });

      setFilteredApiRestaurants(filtered);
    } else {
      setFilteredApiRestaurants([]);
    }
  }, [apiRestaurants, filters]);

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

  const ratingButtons = [
    { rating: "3", label: "3+ Star", color: "amber" },
    { rating: "4", label: "4+ Star", color: "orange" },
    { rating: "5", label: "5 Star", color: "red" },
  ];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-red-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                    <IoLocationOutline className="w-4 h-4" />
                    <span>Delivering to your location</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                    Your Favourite Food
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                      Delivered Hot & Fresh
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                    Healthy switcher chefs do all the prep work, like peeling,
                    chopping & marinating, so you can enjoy fresh, delicious
                    meals delivered right to your door.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <button
                      className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                        activePage === 0
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                      }`}
                      onClick={() => setActivePage(0)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        🍴 Dining Out
                      </span>
                      {activePage === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                    <button
                      className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                        activePage === 1
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                      }`}
                      onClick={() => setActivePage(1)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        🛵 Delivery
                      </span>
                      {activePage === 1 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <img
                      src={HomeBannerImage}
                      alt="Delicious hot meal"
                      className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen">
        {activePage === 0 ? (
          <>
            <Collections />
            {/* Feature Image Section */}
            <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <img
                    src={c5}
                    alt="Food Collection"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Filters Section (moved inside the render function) */}
            <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  {/* Filter Toggle Button (Mobile) */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CiFilter className="w-5 h-5" />
                    Filters
                  </button>

                  {/* Desktop Filters */}
                  <div
                    className={`${
                      showFilters ? "block" : "hidden"
                    } lg:block w-full lg:w-auto`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {/* Search Inputs */}
                      <div className="relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search restaurants..."
                          value={filters.name}
                          onChange={handleNameChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
                        />
                      </div>

                      <div className="relative">
                        <IoLocationOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search by city..."
                          value={filters.city}
                          onChange={handleCityChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
                        />
                      </div>

                      <div className="relative">
                        <MdStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          placeholder="Min Rating"
                          value={filters.minRating}
                          onChange={handleMinRatingChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
                        />
                      </div>

                      <button
                        onClick={handleClearFilters}
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-200 border-2 border-gray-200"
                      >
                        <MdClear className="w-5 h-5" />
                        Clear
                      </button>
                    </div>

                    {/* Rating Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {ratingButtons.map(({ rating, label, color }) => (
                        <button
                          key={rating}
                          onClick={() => dispatch(setMinRatingFilter(rating))}
                          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                            filters.minRating === rating
                              ? `bg-${color}-500 text-white shadow-lg shadow-${color}-500/25`
                              : `border-2 border-${color}-300 text-${color}-600 hover:bg-${color}-50`
                          }`}
                        >
                          <MdStar className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* API Restaurants Section */}
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Nearby Restaurants
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Fresh from our live data feed
                  </p>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500"></div>
                      <div
                        className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-red-500 animate-spin"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">
                      Discovering amazing restaurants near you...
                    </p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <div className="text-red-500 text-6xl mb-4">😞</div>
                    <h3 className="text-xl font-semibold text-red-800 mb-2">
                      Oops! Something went wrong
                    </h3>
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* API Restaurants Grid */}
                {!loading && !error && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {apiRestaurants.length > 0 ? (
                      apiRestaurants.map((restaurant) => (
                        <div
                          key={restaurant._id}
                          onClick={() => navigate(`/landing/${restaurant._id}`)}
                          className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                        >
                          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:border-orange-200">
                            <RestaurantCard
                              restaurant={restaurant}
                              imageUrl={`https://images.unsplash.com/photo-${Math.floor(
                                Math.random() * 1000000
                              )}?auto=format&fit=crop&w=400&h=250&crop=entropy`}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-16">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          No restaurants found
                        </h3>
                        <p className="text-gray-500">
                          Try adjusting your search criteria or location
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Static Restaurants Section */}
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Popular in Delhi NCR
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Curated selection of top-rated restaurants
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => navigate("/landing")}
                        className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:border-orange-200 group-hover:shadow-2xl">
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
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No restaurants match your filters
                      </h3>
                      <p className="text-gray-500">
                        Try clearing some filters to see more options
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <FAQSection />
          </>
        ) : (
          <Delivery />
        )}
      </div>

      <Footer />
    </>
  );
};

export default ZomatoCollections;