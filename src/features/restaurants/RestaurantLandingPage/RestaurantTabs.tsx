import React, { useState, lazy, Suspense, useMemo } from "react";
import { categorizedMenu } from "../../../data/menuData";
import { dummyReviews } from "../../../data/reviewData";
import FoodLoader from "./FoodLoader"; 

const ReviewCard = lazy(() => import("./ReviewCard"));
const MenuItemCard = lazy(() => import("./MenuItemCard"));
const BookTable = lazy(() => import("./BookTable"));

const TABS = ["Reviews","Order Online", "Book a Table"]

const RestaurantTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Reviews");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const categories = useMemo(() => Object.keys(categorizedMenu), []);

  const filteredMenu = useMemo(
    () =>
      Object.entries(categorizedMenu).filter(
        ([category]) => !selectedCategory || selectedCategory === category
      ),
    [selectedCategory]
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Reviews":
        return (
          <Suspense fallback={<FoodLoader/>}>
            <div className="space-y-4">
              {dummyReviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </Suspense>
        );

      case "Order Online": {
        return (
          <div>
            {/* Category Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-1 rounded-full text-sm border transition ${
                  selectedCategory === null
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-red-100"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1 rounded-full text-sm border transition ${
                    selectedCategory === category
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items by Category */}
            <Suspense fallback={<FoodLoader/>}>
              {filteredMenu.map(([category, items]) => {
                const isExpanded = expandedCategories.includes(category);
                const visibleItems = isExpanded ? items : items.slice(0, 3);

                return (
                  <div key={category} className="mb-8">
                    <h3 className="text-2xl font-bold text-red-600 border-b-2 border-red-300 pb-2 mb-4">
                      {category}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visibleItems.map((item, index) => (
                        <MenuItemCard key={index} {...item} />
                      ))}
                    </div>

                    {items.length > 3 && (
                      <div className="mt-3">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </Suspense>
          </div>
        );
      }

      case "Book a Table":
        return (
          <Suspense fallback={<FoodLoader/>}>
            <BookTable />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4">
      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-4 border-b border-gray-200 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm md:text-base px-4 py-2 rounded-t-md transition-all duration-200 ${
              activeTab === tab
                ? "bg-red-500 text-white shadow font-medium"
                : "text-gray-600 hover:text-red-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-gray-700 text-sm md:text-base">{renderContent()}</div>
    </div>
  );
};

export default RestaurantTabs;
