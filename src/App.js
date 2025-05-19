// src/App.js
import React, { useState, useEffect } from 'react';
import ExecutiveSummary from './components/ExecutiveSummary';
import FinancialHealth from './components/FinancialHealth';
import PerformanceMetrics from './components/PerformanceMetrics';
import VendorPerformance from './components/VendorPerformance';
import RiskManagement from './components/RiskManagement';
import TimelineVisualization from './components/TimelineVisualization';
import DashboardFilters from './components/DashboardFilters';
import PDFViewer from './components/PdfViewer';

// Import your data files
import originalFinancialData from './data/financialData';
import originalPerformanceData from './data/performanceData';
import originalVendorData from './data/vendorData';
import originalRiskData from './data/riskData';

import './index.css';

// Import the helper function from the utility file
import { parsePeriodDate } from './utils/dateUtils';

// --- IMPORTANT: Import your PDF file ---
// If 'Project Showcase_ Smart Meals Initiative.pdf' is in your 'public' folder,
// you can reference it directly like this:
const projectShowcasePdfUrl = '/Project Showcase_ Smart Meals Initiative.pdf';

function App() {
  // State to control PDF viewer visibility
  const [showPdfViewer, setShowPdfViewer] = useState(true); // Set to true initially

  // State for filters
  const [timePeriod, setTimePeriod] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // State for active dashboard section
  const [activeSection, setActiveSection] = useState('summary'); // 'summary', 'financials', 'performance', 'vendors', 'risks', 'timeline'

  // Define available filter options (based on your data and desired ranges)
  const availableVendors = [{ name: 'all', label: 'All Vendors' }, ...originalVendorData];
  const availableMetricTypes = [
    { value: 'all', label: 'All Metrics' },
    { value: 'Healthy', label: 'Rated Healthy' },
    { value: 'Filling', label: 'Rated Filling' },
    { value: 'Tasty', label: 'Rated Tasty' },
    { value: 'Affordable', label: 'Rated Affordable' },
    { value: 'PreventedSkipping', label: 'Prevented Meal Skipping' },
  ];
  // Updated available time periods to include ranges
  const availableTimePeriods = [
    { value: 'all', label: 'All Time' },
    { value: 'term1', label: 'Term 1 (Sep-Dec 2023)' },
    { value: 'term2', label: 'Term 2 (Jan-Apr 2024)' },
    { value: 'by_date', label: 'Filter by Specific Date' },
  ];

   const individualDates = timePeriod === 'by_date'
       ? originalPerformanceData.mealsServedOverTime.map(item => item.period)
       : [];
   const [selectedDate, setSelectedDate] = useState('');


   // Function to filter detailed time-based data by period range, specific date, and vendor
   const filterDetailedData = (data, periodFilter, vendorFilter, specificDate) => {
       let filteredData = data;

       if (periodFilter !== 'all') {
           filteredData = data.filter(item => {
               const itemDate = parsePeriodDate(item.period);
               if (!itemDate) return false;

               if (periodFilter === 'term1') {
                   const startDate = new Date(2023, 8, 1);
                   const endDate = new Date(2023, 11, 31);
                   return itemDate >= startDate && itemDate <= endDate;
               } else if (periodFilter === 'term2') {
                   const startDate = new Date(2024, 0, 1);
                   const endDate = new Date(2024, 3, 30);
                   return itemDate >= startDate && itemDate <= endDate;
               } else if (periodFilter === 'by_date' && specificDate) {
                    return item.period === specificDate;
               }
               return true;
           });
       }

       if (vendorFilter !== 'all') {
           filteredData = filteredData.filter(item => item.vendor === vendorFilter);
       }

       return filteredData;
   };


   const filteredDetailedSpending = filterDetailedData(
       originalFinancialData.detailedSpendingOverTime,
       timePeriod,
       selectedVendor,
       selectedDate
   );

   const filteredDetailedMeals = filterDetailedData(
       originalPerformanceData.detailedMealsServedOverTime,
       timePeriod,
       selectedVendor,
       selectedDate
   );

   const aggregatedFilteredSpending = filteredDetailedSpending.reduce((acc, item) => {
       const existingPeriod = acc.find(p => p.period === item.period);
       if (existingPeriod) {
           existingPeriod.total += item.total;
           existingPeriod.Subsidies += item.Subsidies;
           existingPeriod.operationalSpend = (existingPeriod.operationalSpend || 0) + (item.operationalSpend || 0);
           existingPeriod.marketingSpend = (existingPeriod.marketingSpend || 0) + (item.marketingSpend || 0);
       } else {
           acc.push({
               period: item.period,
               total: item.total,
               Subsidies: item.Subsidies,
               operationalSpend: item.operationalSpend || 0,
               marketingSpend: item.marketingSpend || 0
           });
       }
       return acc;
   }, []).sort((a, b) => parsePeriodDate(a.period) - parsePeriodDate(b.period));


   const aggregatedFilteredMeals = filteredDetailedMeals.reduce((acc, item) => {
       const existingPeriod = acc.find(p => p.period === item.period);
       if (existingPeriod) {
           existingPeriod.meals += item.meals;
       } else {
           acc.push({ period: item.period, meals: item.meals });
       }
       return acc;
   }, []).sort((a, b) => parsePeriodDate(a.period) - parsePeriodDate(b.period));


   const filteredVendorData = selectedVendor === 'all'
     ? originalVendorData
     : originalVendorData.filter(vendor => vendor.name === selectedVendor);

   const filteredRiskData = originalRiskData;


  const renderSection = () => {
    switch (activeSection) {
      case 'summary':
        const summaryData = {
            totalBudget: originalFinancialData.totalBudget,
            totalSpent: originalFinancialData.totalSpent,
            totalMealsServed: originalPerformanceData.totalMealsServed,
             performanceMetrics: {
                preventedSkipping: { value: originalPerformanceData.overallSatisfaction.PreventedSkipping || 0, change: 0 },
                ratedHealthy: { value: originalPerformanceData.overallSatisfaction.Healthy || 0, change: 0 },
                ratedFilling: { value: originalPerformanceData.overallSatisfaction.Filling || 0, change: 0 },
                ratedTasty: { value: originalPerformanceData.overallSatisfaction.Tasty || 0, change: 0 },
                ratedAffordable: { value: originalPerformanceData.overallSatisfaction.Affordable || 0, change: 0 },
             }
        };
        return <ExecutiveSummary summaryData={summaryData} />;
      case 'financials':
        return <FinancialHealth
            financialData={{
                ...originalFinancialData,
                spendingOverTime: aggregatedFilteredSpending,
                totalOperationalSpend: originalFinancialData.totalOperationalSpend,
                totalMarketingSpend: originalFinancialData.totalMarketingSpend
            }}
            selectedVendor={selectedVendor}
        />;
      case 'performance':
        return <PerformanceMetrics performanceData={{...originalPerformanceData, mealsServedOverTime: aggregatedFilteredMeals}} selectedMetric={selectedMetric} selectedVendor={selectedVendor} />;
      case 'vendors':
        return <VendorPerformance vendorData={filteredVendorData} />;
      case 'risks':
        return <RiskManagement riskData={filteredRiskData} />;
      case 'timeline':
        return <TimelineVisualization />;
      default:
         const defaultSummaryData = {
            totalBudget: originalFinancialData.totalBudget,
            totalSpent: originalFinancialData.totalSpent,
            totalMealsServed: originalPerformanceData.totalMealsServed,
            performanceMetrics: {
                preventedSkipping: { value: originalPerformanceData.overallSatisfaction.PreventedSkipping || 0, change: 0 },
                ratedHealthy: { value: originalPerformanceData.overallSatisfaction.Healthy || 0, change: 0 },
                ratedFilling: { value: originalPerformanceData.overallSatisfaction.Filling || 0, change: 0 },
                ratedAffordable: { value: originalPerformanceData.overallSatisfaction.Affordable || 0, change: 0 },
                 ratedTasty: { value: originalPerformanceData.overallSatisfaction.Tasty || 0, change: 0 },
             }
         };
        return <ExecutiveSummary summaryData={defaultSummaryData} />;
    }
  };


  return (
    <>
      {showPdfViewer ? (
        <PDFViewer
          pdfUrl={projectShowcasePdfUrl}
          onContinue={() => setShowPdfViewer(false)}
        />
      ) : (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6"> {/* Flex container for logo and title */}
            <img src="/logo.png" alt="App Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Smart Meals Initiative Dashboard</h1>
          </div>

          {/* New button to re-open PDF Viewer */}
          <div className="text-right mb-4">
            <button
              onClick={() => setShowPdfViewer(true)}
              className="bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-purple-700 transition duration-200 ease-in-out"
            >
              View Project Overview PDF
            </button>
          </div>

          <DashboardFilters
            activeSection={activeSection}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            vendors={availableVendors}
            metricTypes={availableMetricTypes}
            availableTimePeriods={availableTimePeriods}
            individualDates={individualDates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-3">
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 ease-in-out ${activeSection === 'summary' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => setActiveSection('summary')}
            >
              Executive Summary
            </button>
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 ease-in-out ${activeSection === 'financials' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => setActiveSection('financials')}
            >
              Financial Health
            </button>
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 ease-in-out ${activeSection === 'performance' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => setActiveSection('performance')}
            >
              Performance Metrics
            </button>
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 ease-in-out ${activeSection === 'vendors' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => setActiveSection('vendors')}
            >
              Vendor Performance
            </button>
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 ease-in-out ${activeSection === 'risks' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => setActiveSection('risks')}
            >
              Risk Management
            </button>
             <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 ease-in-out ${activeSection === 'timeline' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => setActiveSection('timeline')}
            >
              Timeline
            </button>
          </div>

          <div className="mt-4 sm:mt-6">
            {renderSection()}
          </div>

           <div className="pb-12"></div>

        </div>
      )}
    </>
  );
}

export default App;