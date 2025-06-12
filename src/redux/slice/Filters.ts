import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  filters: {
    name: '',
    location: '',
    city: '',
    minRating: '',
  },
  filteredRestaurants: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.filters.name = action.payload;
    },
    setLocationFilter: (state, action) => {
      state.filters.location = action.payload;
    },
    setCityFilter: (state, action) => {
      state.filters.city = action.payload;
    },
    setMinRatingFilter: (state, action) => {
      state.filters.minRating = action.payload;
    },
    applyFilters: (state, action) => {
      const restaurants = action.payload;
      state.filteredRestaurants = restaurants.filter((restaurant: { name: string; location: string; city: string; rating: number; }) => {
        return (
          (!state.filters.name || 
            restaurant.name.toLowerCase().includes(state.filters.name.toLowerCase())) &&
          (!state.filters.location || 
            restaurant.location.toLowerCase().includes(state.filters.location.toLowerCase())) &&
          (!state.filters.city || 
            restaurant.city.toLowerCase().includes(state.filters.city.toLowerCase())) &&
          (!state.filters.minRating || 
            restaurant.rating >= Number(state.filters.minRating))
        );
      });
    },
    clearFilters: (state) => {
      state.filters = {
        name: '',
        location: '',
        city: '',
        minRating: '',
      };
      state.filteredRestaurants = [];
    },
  },
});

export const { 
  setNameFilter, 
  setLocationFilter, 
  setCityFilter, 
  setMinRatingFilter, 
  applyFilters, 
  clearFilters 
} = filterSlice.actions;

export default filterSlice.reducer;