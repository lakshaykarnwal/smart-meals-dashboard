// src/components/VendorCard.jsx
import React from 'react';

const VendorCard = ({ vendor }) => {
  const utilization = ((vendor.mealsSold / vendor.capacity) * 100).toFixed(1);

  // Determine color for utilization based on a threshold (e.g., > 80% is good)
  const utilizationColor = utilization > 80 ? 'text-green-600' : utilization > 60 ? 'text-yellow-600' : 'text-red-600';


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
      <p className="text-gray-600">Meals Sold: <span className="font-bold">{vendor.mealsSold.toLocaleString()}</span></p>
      <p className="text-gray-600">Capacity: <span className="font-bold">{vendor.capacity.toLocaleString()}</span></p>
      <p className="text-gray-600">Utilization: <span className={`font-bold ${utilizationColor}`}>{utilization}%</span></p>
      {/* Could add a simple progress bar here later */}
    </div>
  );
};

export default VendorCard;