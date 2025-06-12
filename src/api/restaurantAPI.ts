// src/api/restaurantAPI.js

// Example using fetch to simulate an API call
export async function fetchNearbyRestaurants(location) {
  try {
    // Replace this URL with your real backend or external API endpoint
    const response = await fetch(
      `https://api.example.com/restaurants/nearby?lat=${location.lat}&lng=${location.lng}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch nearby restaurants");
    }

    const data = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error("Error fetching nearby restaurants:", error);
    throw error;
  }
}
