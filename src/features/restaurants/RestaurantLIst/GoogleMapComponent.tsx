import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Define the type for the containerStyle object
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Define the type for the center coordinates
const center: google.maps.LatLngLiteral = {
  lat: 28.6139,
  lng: 77.209,
};

const GoogleMapComponent: React.FC = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
