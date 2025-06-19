import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { fetchSuggestions, fetchSearchResults } from "../redux/slice/searchSlice";
import type { RootState } from "../redux/store";
import type { PublicRestaurant } from "../types/types";
import { useAppDispatch } from "../hooks/useAppDispatch";

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useSelector((state: RootState) => state.search.suggestions);

  useEffect(() => {
    if (query.length >= 2) {
      dispatch(fetchSuggestions(query));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
      navigate(`/search?q=${query}`);
      setShowDropdown(false);
    }
  };

  const handleSelectRestaurant = (restaurant: PublicRestaurant) => {
    navigate(`/restaurant/${restaurant._id}`,{state:{restaurant}});
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-3 md:mt-0">
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants..."
          className="w-full px-4 py-2 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white p-2 hover:bg-orange-600"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 rounded-md shadow-md z-50"
        >
          {suggestions.map((restaurant) => (
            <div
              key={restaurant._id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectRestaurant(restaurant)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="restaurant"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm">{restaurant.name}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{restaurant.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
