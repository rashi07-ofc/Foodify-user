import React, { useState, Suspense } from "react";
import { dummyReviews } from "../../../data/reviewData";
import FoodLoader from "./FoodLoader";
const MenuLIst =React.lazy(()=>import("./MenuList"))
const ReviewCard = React.lazy(() => import("./ReviewCard"));
const BookTable = React.lazy(() => import("./BookTable"));

const TABS = ["Reviews", "Order Online", "Book a Table"];

const RestaurantTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Reviews");

  const renderContent = () => {
    switch (activeTab) {
      case "Reviews":
        return (
          <Suspense fallback={<FoodLoader />}>
            <div className="space-y-4">
              {dummyReviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </Suspense>
        );

      case "Order Online":
        return (<Suspense fallback={<FoodLoader/>}>
          <MenuLIst/>
        </Suspense>
        );

      case "Book a Table":
        return (
          <Suspense fallback={<FoodLoader />}>
            <BookTable />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4">
      <div className="flex justify-center mb-6 space-x-4 border-b border-gray-200 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm md:text-base px-4 py-2 rounded-t-md transition-all duration-200 ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow font-medium"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 text-gray-700 text-sm md:text-base">
        {renderContent()}
      </div>
    </div>
  );
};

export default RestaurantTabs;
