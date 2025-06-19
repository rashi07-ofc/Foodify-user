import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PublicRestaurant, SearchResult } from "../../types/types";
import { searchApi } from "../../api/searchApi";

interface SearchState {
  results: PublicRestaurant[];
  suggestions: PublicRestaurant[];
  totalResults: number;
  selectedRestaurant: PublicRestaurant | null; // ✅ add this
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  suggestions: [],
  totalResults: 0,
  selectedRestaurant: null, // ✅ add this
  loading: false,
  error: null,
};



// Thunk for full search
export const fetchSearchResults = createAsyncThunk<
  SearchResult,
  string,
  { rejectValue: string }
>("search/fetchSearchResults", async (query, { rejectWithValue }) => {
  try {
    return await searchApi.searchAll(query);
  } catch (error) {
    return rejectWithValue("Failed to fetch search results");
  }
});

// Thunk for suggestions
export const fetchSuggestions = createAsyncThunk<
  PublicRestaurant[],
  string,
  { rejectValue: string }
>("search/fetchSuggestions", async (query, { rejectWithValue }) => {
  try {
    return await searchApi.getSuggestions(query);
  } catch (error) {
    return rejectWithValue("Failed to fetch suggestions");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.results = [];
      state.totalResults = 0;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
    setSelectedRestaurant(state, action) {
  state.selectedRestaurant = action.payload;
},

  },
  extraReducers: (builder) => {
    builder
      // Search results
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.results = action.payload.restaurants;
        state.totalResults = action.payload.totalResults;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      })

      // Suggestions
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch suggestions";
      });
  },
});

export const { clearSearchResults, clearSuggestions,setSelectedRestaurant } = searchSlice.actions;

export default searchSlice.reducer;
