import React, { Suspense, lazy } from "react";
import RestaurantCard from "./RestaurantCard";
import CouponList from "./CouponList";
import { restaurant } from "./restaurantData";
import FoodLoader from "./FoodLoader";
import Navbar from "../../../components/layout/Navbar";
import { useParams } from "react-router-dom";

const RestaurantTabs = lazy(() => import("./RestaurantTabs"));
const RestaurantHighlights = lazy(() => import("./RestaurantHighlights"));
const MainPage: React.FC = () => {
  const { id } = useParams();
  // console.log(id);
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-12 pt-20">
        <Navbar />
        <RestaurantCard />
        <Suspense fallback={<FoodLoader />}>
          <div id="restaurant-tabs">
            <RestaurantTabs />
          </div>
          <div className="my-8">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              Available Coupons
            </h2>
            <CouponList restaurantId={id} orderAmount={600} />
          </div>

          <RestaurantHighlights features={restaurant.features} />
        </Suspense>
      </div>
    </>
  );
};

export default MainPage;
