// src/components/FinancialHealth.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

const FinancialHealth = ({ financialData, selectedVendor }) => {
  const { totalBudget, budgetAllocation, spendingOverTime } = financialData;

   // Calculate overall total spent from the budget allocation spent values
   const overallTotalSpent = budgetAllocation.reduce((sum, item) => sum + item.spent, 0);

   // Calculate budget utilization percentage
   const budgetUtilizationPercentage = totalBudget > 0
     ? ((overallTotalSpent / totalBudget) * 100).toFixed(1) // toFixed(1) for one decimal place
     : 'N/A';

   // Determine color for the progress bar (e.g., green if under budget, yellow/red if approaching/over)
   const progressBarColor = budgetUtilizationPercentage > 100 ? 'bg-red-500' :
                            budgetUtilizationPercentage > 80 ? 'bg-yellow-500' :
                            'bg-green-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Financial Health</h2>

       {/* Summary Financials - Updated to show Budget Utilization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-md font-semibold text-gray-700">Total Budget</h3>
            <p className="text-xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
         </div>
         <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-md font-semibold text-gray-700">Total Spent</h3>
            <p className="text-xl font-bold text-gray-900">${overallTotalSpent.toLocaleString()}</p>
         </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-md font-semibold text-gray-700">Remaining Budget</h3>
            <p className="text-xl font-bold text-gray-900">${(totalBudget - overallTotalSpent).toLocaleString()}</p>
         </div>
      </div>

       {/* Budget Utilization Progress Bar */}
       <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Budget Utilization: {budgetUtilizationPercentage}%</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                    className={`h-4 rounded-full ${progressBarColor}`}
                    style={{ width: `${Math.min(budgetUtilizationPercentage, 100)}%` }} // Cap width at 100% visually
                ></div>
            </div>
             {overallTotalSpent > totalBudget && (
                 <p className="text-sm text-red-600 mt-1">Note: Spending exceeds budget.</p>
             )}
       </div>


      {/* Budget vs Actual Spending Bar Chart */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Budget vs Actual Spending by Category</h3>
       {/* Add a check if budgetAllocation data exists */}
       {budgetAllocation && budgetAllocation.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={budgetAllocation}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              {/* Improve YAxis tick formatter for currency */}
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              {/* Improve Tooltip formatter for currency */}
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="allocated" fill="#8884d8" name="Allocated Budget" />
              <Bar dataKey="spent" fill="#82ca9d" name="Actual Spending" />
            </BarChart>
          </ResponsiveContainer>
       ) : (
           <p className="text-gray-600">No budget allocation data available.</p>
       )}

      {/* Spending Trend Line Chart */}
      <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4">Spending Trend Over Time</h3>
       {/* Add note about simulation if vendor filter is active */}
       {selectedVendor !== 'all' && (
           <p className="text-sm text-gray-600 mb-2">Note: Per vendor spending data over time is simulated.</p>
       )}
      {/* Add a check if spendingOverTime data exists */}
      {spendingOverTime && spendingOverTime.length > 0 ? (
         <ResponsiveContainer width="100%" height={300}>
           <LineChart
             data={spendingOverTime}
             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
           >
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="period" />
             {/* Improve YAxis tick formatter for currency */}
             <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
             {/* Improve Tooltip formatter for currency */}
             <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
             <Legend />
             {/* Show line for total spending, with vendor name if filtered */}
             <Line
                 type="monotone"
                 dataKey="total"
                 stroke="#ff7300"
                 name={selectedVendor === 'all' ? 'Total Spending (All Vendors)' : `Spending (${selectedVendor}) (Simulated)`}
                 activeDot={{ r: 8 }}
             />
           </LineChart>
         </ResponsiveContainer>
      ) : (
          <p className="text-gray-600">No spending trend data available for the selected filters.</p>
      )}
    </div>
  );
};

export default FinancialHealth;