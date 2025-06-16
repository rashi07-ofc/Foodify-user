import React, { Suspense, lazy } from "react";
import RestaurantCard from "./RestaurantCard";
const RestaurantTabs = lazy(() => import("./RestaurantTabs"));
const RestaurantHighlights = lazy(() => import("./RestaurantHighlights"));
import { restaurant } from "./restaurantData";
import FoodLoader from "./FoodLoader";
import Navbar from "../../../components/layout/Navbar";

const MainPage: React.FC = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-12 pt-20">
        <Navbar />
        <RestaurantCard />
        <Suspense fallback={<FoodLoader />}>
          <div id="restaurant-tabs">
            <RestaurantTabs />
          </div>
          <RestaurantHighlights features={restaurant.features} />
        </Suspense>
      </div>
    </>
  );
};

export default MainPage;
