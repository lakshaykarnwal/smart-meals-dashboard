// src/components/KPICard.jsx
import React from 'react';

const KPICard = ({ title, value, percentageChange, description }) => {
  const changeColor = percentageChange >= 0 ? 'text-green-600' : 'text-red-600';
  const changeArrow = percentageChange >= 0 ? '▲' : '▼';

  return (
    // Refined card styling
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
      {percentageChange !== undefined && description && (
        <p className={`text-xs ${changeColor} mt-1`}>
          {changeArrow} {Math.abs(percentageChange)}% {description}
        </p>
      )}
    </div>
  );
};

export default KPICard;