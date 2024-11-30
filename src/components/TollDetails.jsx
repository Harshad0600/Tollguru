import React from "react";

const TollDetails = ({ totalCost }) => (
  <div className="p-4 bg-gray-50 shadow-md rounded text-center">
    <h2 className="text-xl font-semibold">Total Toll Cost</h2>
    <p className="text-lg mt-2">{totalCost > 0 ? `₹${totalCost}` : "Calculating..."}</p>
  </div>
);

export default TollDetails;
