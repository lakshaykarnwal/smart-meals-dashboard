// src/components/PerformanceMetrics.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceMetrics = ({ performanceData, selectedMetric, selectedVendor }) => {
  const { mealsServedOverTime, satisfactionOverTime, overallSatisfaction } = performanceData;

   // Filter satisfaction data based on selectedMetric (logic remains similar)
   const filteredSatisfactionData = selectedMetric === 'all'
     ? satisfactionOverTime
     : satisfactionOverTime.map(item => {
         const newItem = { period: item.period };
         if (item[selectedMetric] !== undefined) {
             newItem[selectedMetric] = item[selectedMetric];
         }
         return newItem;
       });


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>

      {/* Meals Served Over Time Line Chart */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Meals Served Over Time</h3>
       {/* Add note about simulation if vendor filter is active */}
       {selectedVendor !== 'all' && (
           <p className="text-sm text-gray-600 mb-2">Note: Per vendor meal data over time is simulated.</p>
       )}
      {/* Add a check if mealsServedOverTime data exists */}
      {mealsServedOverTime && mealsServedOverTime.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={mealsServedOverTime}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              {/* Improve Tooltip formatter for numbers */}
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
               {/* Show line for all meals or meals for selected vendor */}
              <Line
                 type="monotone"
                 dataKey="meals"
                 stroke="#8884d8"
                 name={selectedVendor === 'all' ? 'Meals Served (All Vendors)' : `Meals Served (${selectedVendor}) (Simulated)`}
                 activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
      ) : (
          <p className="text-gray-600">No meals served data available for the selected filters.</p>
      )}


      {/* Satisfaction Scores Over Time Line Chart */}
      <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4">Satisfaction Scores Over Time (%)</h3>
        {/* Note about simulation is less relevant here as satisfaction isn't filtered by vendor over time */}
       {filteredSatisfactionData && filteredSatisfactionData.length > 0 ? (
           <ResponsiveContainer width="100%" height={300}>
             <LineChart
               data={filteredSatisfactionData}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
             >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="period" />
               <YAxis domain={[0, 100]} />
               {/* Improve Tooltip formatter for percentages */}
               <Tooltip formatter={(value) => `${value}%`} />
               <Legend />
               {/* Conditionally render lines based on selectedMetric */}
                {selectedMetric === 'all' || selectedMetric === 'Healthy' ? (
                  <Line type="monotone" dataKey="Healthy" stroke="#82ca9d" activeDot={{ r: 8 }} name="Rated Healthy" />
                ) : null}
                {selectedMetric === 'all' || selectedMetric === 'Filling' ? (
                   <Line type="monotone" dataKey="Filling" stroke="#ffc658" name="Rated Filling" />
                ) : null}
                 {selectedMetric === 'all' || selectedMetric === 'Affordable' ? (
                    <Line type="monotone" dataKey="Affordable" stroke="#ff7300" name="Rated Affordable" />
                 ) : null}
                  {selectedMetric === 'all' || selectedMetric === 'PreventedSkipping' ? (
                     <Line type="monotone" dataKey="PreventedSkipping" stroke="#38b2ac" name="Prevented Skipping" />
                  ) : null}
                  {selectedMetric === 'all' || selectedMetric === 'Tasty' ? (
                     <Line type="monotone" dataKey="Tasty" stroke="#e57373" name="Rated Tasty" />
                  ) : null}
             </LineChart>
           </ResponsiveContainer>
       ) : (
            <p className="text-gray-600">No satisfaction data available for the selected filters.</p>
       )}
    </div>
  );
};

export default PerformanceMetrics;