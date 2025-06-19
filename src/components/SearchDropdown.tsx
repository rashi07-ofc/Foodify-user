import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSelectedRestaurant } from "../redux/slice/searchSlice";
import type { PublicRestaurant } from "../types/types";

interface Props {
  suggestions: PublicRestaurant[];
  onClose: () => void;
}

const SearchDropdown: React.FC<Props> = ({ suggestions, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSelect = (restaurant: PublicRestaurant) => {
    dispatch(setSelectedRestaurant(restaurant));
    onClose();
    setTimeout(()=>{
      navigate(`/restaurant/${restaurant._id}`, { state: { restaurant } });

    },50)
  };

  return (
    <ul className="absolute bg-white shadow-lg border rounded w-full max-h-60 overflow-y-auto z-50">
      {suggestions.map((rest) => (
        <li
          key={rest._id}
          onClick={() => handleSelect(rest)}
          className="p-3 hover:bg-orange-100 cursor-pointer"
        >
          {rest.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchDropdown;
