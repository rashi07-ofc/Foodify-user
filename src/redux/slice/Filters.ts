import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Filters{
  name:string;
  location:string;
  city:string;
  minRating:string;
}

interface Restaurant{
    id: number;
    name: string;
    city: string;
    price_per_dish: string;
    timings: string;
    rating: number;
    distance: string;
    coupon_percent: string;
}

interface FilterState{
  filters:Filters;
  filteredRestaurants:Restaurant[];
}


const initialState:FilterState = {
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
    setNameFilter: (state, action:PayloadAction<string>) => {
      state.filters.name = action.payload;
    },
    setLocationFilter: (state, action:PayloadAction<string>) => {
      state.filters.location = action.payload;
    },
    setCityFilter: (state, action:PayloadAction<string>) => {
      state.filters.city = action.payload;
    },
    setMinRatingFilter: (state, action:PayloadAction<string>) => {
      state.filters.minRating = action.payload;
    },
    applyFilters: (state, action:PayloadAction<Restaurant[]>) => {
      const restaurants = action.payload;
      state.filteredRestaurants = restaurants.filter((restaurant:Restaurant) => {
        return (
          (!state.filters.name || 
            restaurant.name.toLowerCase().includes(state.filters.name.toLowerCase())) &&
          // (!state.filters.location || 
            // restaurant.location.toLowerCase().includes(state.filters.location.toLowerCase())) 
            // &&
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