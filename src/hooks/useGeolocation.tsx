import { useState } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError("Could not get location.");
        console.error(err);
      }
    );
  };

  return { location, error, getLocation };
};

export default useGeolocation;
