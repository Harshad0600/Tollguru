import axios from "axios";

const geocode = async (place) => {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json`;

  try {
    const response = await axios.get(url, {
      params: {
        q: place,
        key: apiKey,
      },
    });

    const location = response.data.results[0].geometry;
    return `${location.lat},${location.lng}`; // Return as "lat,lng"
  } catch (error) {
    console.error(`Geocoding error for "${place}":`, error);
    throw new Error("Failed to geocode location");
  }
};

export default geocode;
