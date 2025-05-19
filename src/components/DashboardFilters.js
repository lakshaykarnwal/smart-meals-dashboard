// src/components/DashboardFilters.jsx
import React from 'react';

const DashboardFilters = ({
  activeSection,
  timePeriod,
  setTimePeriod,
  selectedVendor,
  setSelectedVendor,
  selectedMetric,
  setSelectedMetric,
  vendors,
  metricTypes,
  availableTimePeriods,
  individualDates, // Receive individual dates
  selectedDate, // Receive selected date state
  setSelectedDate, // Receive selected date setter
}) => {

  // Determine which filters to show based on activeSection
  const showTimePeriodFilter = activeSection === 'financials' || activeSection === 'performance';
  const showVendorFilter = activeSection === 'vendors' || activeSection === 'financials' || activeSection === 'performance'; // Show vendor filter on relevant charts
  const showMetricTypeFilter = activeSection === 'performance';

  const showFilterSectionTitle = showTimePeriodFilter || showVendorFilter || showMetricTypeFilter;


  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6"> {/* Adjusted padding */}
      {showFilterSectionTitle && (
           // Adjusted text size and margin
           <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Filters</h2>
      )}

      {/* Use a grid for layout, adjusting columns for different screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Adjusted gap and columns */}
        {/* Time Period Filter */}
        {showTimePeriodFilter && (
          <div>
            <label htmlFor="timePeriod" className="block text-sm font-medium text-gray-700 mb-1">Time Period</label> {/* Adjusted margin */}
            <select
              id="timePeriod"
              name="timePeriod"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm" // Added shadow-sm
              value={timePeriod}
              onChange={(e) => {
                  setTimePeriod(e.target.value);
                  // Reset specific date when range changes
                  if (e.target.value !== 'by_date') {
                      setSelectedDate('');
                  }
              }}
            >
              {availableTimePeriods.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Specific Date Dropdown (conditionally rendered) */}
            {timePeriod === 'by_date' && individualDates.length > 0 && (
                <select
                    id="specificDate"
                    name="specificDate"
                    className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm" // Added shadow-sm
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="">Select a Date</option>
                    {individualDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            )}
          </div>
        )}


        {/* Vendor Filter */}
        {showVendorFilter && (
          <div>
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">Vendor</label> {/* Adjusted margin */}
            <select
              id="vendor"
              name="vendor"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm" // Added shadow-sm
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option value="all">All Vendors</option>
              {vendors.map(vendor => (
                  <option key={vendor.name} value={vendor.name}>{vendor.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Metric Type Filter (Primarily for Performance Metrics) */}
         {showMetricTypeFilter && (
           <div>
            <label htmlFor="metricType" className="block text-sm font-medium text-gray-700 mb-1">Performance Metric</label> {/* Adjusted margin */}
            <select
              id="metricType"
              name="metricType"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm" // Added shadow-sm
               value={selectedMetric}
               onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="all">All Metrics</option>
              {metricTypes.map(metric => (
                  <option key={metric.value} value={metric.value}>{metric.label}</option>
              ))}
            </select>
          </div>
         )}
      </div>
      {!showFilterSectionTitle && (
          // Adjusted text size
          <p className="text-gray-600 text-sm">No filters available for this section.</p>
      )}
    </div>
  );
};

export default DashboardFilters;