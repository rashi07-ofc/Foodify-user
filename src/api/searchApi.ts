import type { PublicRestaurant, SearchResult } from "../types/types";
import axiosInstance from "./axiosInstance";

export const searchApi = {
  async searchRestaurants(query: string): Promise<PublicRestaurant[]> {
    try {
      const { data } = await axiosInstance.get("/restaurant/search/food", {
        params: { q: query },
      });

      return data?.map((restaurant: any) => ({
        _id: restaurant._id,
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        phone: restaurant.phone,
        managerId: restaurant.managerId,
        tags: restaurant.tags,
      })) ?? [];
    } catch (error) {
      console.error("Error searching restaurants:", error);
      throw error;
    }
  },

  async searchAll(query: string): Promise<SearchResult> {
    try {
      const restaurants = await this.searchRestaurants(query);
      return {
        restaurants,
        totalResults: restaurants.length,
      };
    } catch (error) {
      console.error("Error in searchAll:", error);
      throw error;
    }
  },

  async getSuggestions(query: string): Promise<PublicRestaurant[]> {
    if (query.trim().length < 2) return [];
    try {
      const restaurants = await this.searchRestaurants(query);
      return restaurants.slice(0, 8);
    } catch (error) {
      console.error("Error getting suggestions:", error);
      return [];
    }
  },
};
