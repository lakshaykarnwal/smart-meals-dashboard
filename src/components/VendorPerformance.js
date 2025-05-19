// src/components/VendorPerformance.jsx
import React from 'react';
import VendorCard from './VendorCard';
// Remove: import vendorData from '../data/vendorData';

const VendorPerformance = ({ vendorData }) => { // Accept vendorData as prop
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Vendor Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add a check if vendorData exists */}
        {vendorData && vendorData.length > 0 ? (
            vendorData.map(vendor => (
              <VendorCard key={vendor.name} vendor={vendor} />
            ))
        ) : (
            <p className="text-gray-600">No vendor data available for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default VendorPerformance;