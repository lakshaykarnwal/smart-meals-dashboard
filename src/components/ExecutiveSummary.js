// src/components/ExecutiveSummary.jsx
import React from 'react';
import KPICard from './KPICard';

const ExecutiveSummary = ({ summaryData }) => {
  const { totalBudget, totalSpent, totalMealsServed, performanceMetrics } = summaryData;
  const budgetUtilization = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 'N/A';

  return (
    // Apply card-like styling to the container
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-4 sm:mt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Executive Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> {/* Adjusted gap */}
          {/* Financial KPIs */}
          <KPICard
            title="Total Budget"
            value={`$${totalBudget.toLocaleString()}`}
          />
           <KPICard
            title="Total Spent"
            value={`$${totalSpent.toLocaleString()}`}
          />
           <KPICard
            title="Budget Utilization"
            value={`${budgetUtilization}%`}
          />

          {/* Meals KPI */}
          <KPICard
            title="Total Meals Served"
            value={totalMealsServed.toLocaleString()}
          />

          {/* Performance KPIs */}
          <KPICard
            title="Prevented Meal Skipping"
            value={`${performanceMetrics.preventedSkipping.value}%`}
          />
           <KPICard
            title="Rated Healthy"
            value={`${performanceMetrics.ratedHealthy.value}%`}
          />
           <KPICard
            title="Rated Filling"
            value={`${performanceMetrics.ratedFilling.value}%`}
          />
            <KPICard // Added Tasty KPI Card
            title="Rated Tasty"
            value={`${performanceMetrics.ratedTasty.value}%`}
          />
           <KPICard
            title="Rated Affordable"
            value={`${performanceMetrics.ratedAffordable.value}%`}
          />
        </div>
    </div>
  );
};

export default ExecutiveSummary;