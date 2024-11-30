import React, { useState } from "react";
import axios from "axios";
import InputForm from "../components/InputForm";
import Map from "../components/Map";
import TollDetails from "../components/TollDetails";  

const HomePage = () => {
  const [route, setRoute] = useState(null);
  const [tollPoints, setTollPoints] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleTollCalculation = async (start, end) => {
    try {
      // Prepare the API request payload
      const requestData = {
        from: { address: start },
        to: { address: end },
        serviceProvider: "here",  // You can change the service provider if needed
        waypoints: [],  // Add any waypoints if required (leave empty if none)
        vehicle: { type: "2AxlesAuto" }, // Change vehicle type if needed
      };
  
      // Make the API call
      const response = await axios.post(
        "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "PdNDD949Jf4FLT6fp7J2bhQ8Pq4N4Jdg", // Your API key here
          },
        }
      );
  
      console.log("Toll Calculation Response:", response.data);
  
      // Check if routes are available and extract tolls
      if (response.data && response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
  
        // Sum up the cashCost from the tolls array
        let totalTollCost = 0;
        if (route.tolls && route.tolls.length > 0) {
          totalTollCost = route.tolls.reduce((sum, toll) => sum + (toll.cashCost || 0), 0);
        }
  
        // Update the state with the total toll cost
        console.log("Total Toll Cost (Cash):", totalTollCost);
        setTotalCost(totalTollCost); // Set the total cost in the state
  
      } else {
        console.error("No tolls data found in the response.");
        alert("No toll data found.");
      }
      
    } catch (error) {
      console.error("Error fetching toll data:", error);
      alert("Failed to calculate toll costs. Please try again.");
    }
  };
  

  return (
    <div className="p-8 space-y-6">
      <InputForm onSubmit={handleTollCalculation} />
      <TollDetails totalCost={totalCost} />
      <Map route={route} tollPoints={tollPoints} />
    </div>
  );
};

export default HomePage;
