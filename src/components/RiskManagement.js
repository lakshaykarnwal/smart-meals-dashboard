// src/components/RiskManagement.jsx
import React from 'react';
// Remove: import riskData from '../data/riskData'; // Risk data might not be filtered

const RiskManagement = ({ riskData }) => { // Accept riskData as prop

  const getStatusColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Risk Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-500 uppercase tracking-wider">
                Mitigation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {/* Add a check if riskData exists */}
            {riskData && riskData.length > 0 ? (
                riskData.map(risk => (
                  <tr key={risk.id}>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                      {risk.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(risk.severity)} text-white`}>
                        {risk.status}
                      </span>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                       {risk.severity}
                    </td>
                     <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                       {risk.mitigation}
                    </td>
                  </tr>
                ))
             ) : (
                 <tr><td colSpan="4" className="px-6 py-4 text-sm text-gray-600 text-center">No risk data available.</td></tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskManagement;