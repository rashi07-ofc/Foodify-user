import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    () => {
      const storedLat = localStorage.getItem("userLat");
      const storedLon = localStorage.getItem("userLon");
      if (storedLat && storedLon) {
        return { lat: parseFloat(storedLat), lon: parseFloat(storedLon) };
      }
      return null;
    }
  );
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(newLocation);
        setError(null);
        // Store in localStorage
        localStorage.setItem("userLat", newLocation.lat.toString());
        localStorage.setItem("userLon", newLocation.lon.toString());
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Geolocation permission denied. Please enable it in your browser settings.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable. Please try again later.");
            break;
          case err.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          default:
            setError("An unknown error occurred while getting your location.");
            break;
        }
        console.error("Geolocation error:", err);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (!location) { 
        getLocation();
    }

  }, []);

  return { location, error, getLocation };
};

export default useGeolocation;