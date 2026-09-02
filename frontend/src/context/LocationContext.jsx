import { createContext, useContext, useState } from "react";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        setLocation({
          latitude,
          longitude,
          accuracy,
        });

        setLocationStatus("granted");
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus("denied");
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationStatus("unavailable");
            break;

          case error.TIMEOUT:
            setLocationStatus("timeout");
            break;

          default:
            setLocationStatus("error");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const clearLocation = () => {
    setLocation(null);
    setLocationStatus("idle");
  };

  const value = {
    location,
    locationStatus,
    requestLocation,
    clearLocation,
    hasLocation: Boolean(location),

    // Convenience flags for components such as LocationGate
    isLoading: locationStatus === "loading",
    isGranted: locationStatus === "granted",
    isDenied: locationStatus === "denied",
    isUnsupported: locationStatus === "unsupported",
    hasError: [
      "denied",
      "unavailable",
      "timeout",
      "error",
      "unsupported",
    ].includes(locationStatus),
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocation must be used inside LocationProvider"
    );
  }

  return context;
}