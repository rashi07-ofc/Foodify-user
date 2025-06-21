import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setNameFilter, 
  setLocationFilter, 
  setCityFilter, 
  setMinRatingFilter, 
  applyFilters,
  clearFilters 
} from "../redux/slice/Filters";

const RestaurantFilter = ({ restaurants }) => {
  const dispatch = useDispatch();
  const { filters, filteredRestaurants } = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(applyFilters(restaurants));
  }, [filters, restaurants, dispatch]);

  return (
    
    <div className="filter-container">
      <div className="filter-inputs">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={filters.name}
          onChange={(e) => dispatch(setNameFilter(e.target.value))}
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => dispatch(setLocationFilter(e.target.value))}
        />
        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => dispatch(setCityFilter(e.target.value))}
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={filters.minRating}
          onChange={(e) => dispatch(setMinRatingFilter(e.target.value))}
        />
        <button onClick={() => dispatch(clearFilters())}>
          Clear Filters
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-item">
            <h3>{restaurant.name}</h3>
            <p>Location: {restaurant.location}</p>
            <p>City: {restaurant.city}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default RestaurantFilter;