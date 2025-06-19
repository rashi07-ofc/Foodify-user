import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchSearchResults, setSelectedRestaurant } from "../redux/slice/searchSlice";
import { RestaurantCard } from "../components/RestaurantCard2";

const SearchPage: React.FC = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.search.results);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) dispatch(fetchSearchResults(query));
  }, [query]);

  const handleClick = (restaurant: any) => {
    dispatch(setSelectedRestaurant(restaurant));
    navigate(`/restaurant/${restaurant._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-35">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {results.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            onClick={() => handleClick(restaurant)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;