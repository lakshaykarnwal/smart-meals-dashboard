// src/data/vendorData.js

const totalMealsServed = 8270; // From performance data

const vendorData = [
  { name: 'Well Pub', mealsSold: 1300, capacity: 1500, perDayAllocation: 30 }, // Added perDayAllocation for reference
  { name: 'J\'s Cafe', mealsSold: 1000, capacity: 1200, perDayAllocation: 50 },
  { name: 'Koi Sushi', mealsSold: 1500, capacity: 1800, perDayAllocation: 80 },
  { name: 'Fusion Express', mealsSold: 2000, capacity: 2500, perDayAllocation: 80 }, // Over 1500 as mentioned
  { name: 'Vendor 5', mealsSold: 1300, capacity: 1500, perDayAllocation: null }, // Placeholder
  { name: 'Vendor 6', mealsSold: 1170, capacity: 1400, perDayAllocation: null }, // Placeholder
  // Total meals sold: 1300 + 1000 + 1500 + 2000 + 1300 + 1170 = 8270 (matches total meals served)
];

export default vendorData;