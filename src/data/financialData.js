// src/data/financialData.js

// Note: parsePeriodDate is used in App.js, not directly in this file, so it's removed here for clarity.

// Keep budget allocation structure. Total spent will be calculated from detailed data.
// The 'allocated' values represent the planned budget distribution.
const budgetAllocation = [
  { category: 'Subsidies', allocated: 45000 },
  { category: 'Marketing', allocated: 4500 },
  { category: 'Operations', allocated: 8500 },
];

const totalBudget = budgetAllocation.reduce((sum, item) => sum + item.allocated, 0);


// Simulated detailed spending over time, broken down by vendor (subsidy cost)
// THIS DATA IS NOW COMPLETE BASED ON YOUR PROVIDED SPREADSHEET PDFs.
const detailedSpendingOverTime = [
  { period: 'Sep 27th', vendor: 'Koi Sushi', Subsidies: 300, operationalSpend: 205.88, marketingSpend: 73.53, total: 579.41 },
  { period: 'Sep 27th', vendor: 'Fusion Express', Subsidies: 400, operationalSpend: 0, marketingSpend: 0, total: 400 },
  { period: 'Sep 27th', vendor: 'J\'s Cafe', Subsidies: 150, operationalSpend: 0, marketingSpend: 0, total: 150 },
  { period: 'Sep 27th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Oct 11th', vendor: 'Koi Sushi', Subsidies: 450, operationalSpend: 205.88, marketingSpend: 73.53, total: 729.41 },
  { period: 'Oct 11th', vendor: 'Fusion Express', Subsidies: 600, operationalSpend: 0, marketingSpend: 0, total: 600 },
  { period: 'Oct 11th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Oct 11th', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Oct 25th', vendor: 'Koi Sushi', Subsidies: 400, operationalSpend: 205.88, marketingSpend: 73.53, total: 679.41 },
  { period: 'Oct 25th', vendor: 'Fusion Express', Subsidies: 600, operationalSpend: 0, marketingSpend: 0, total: 600 },
  { period: 'Oct 25th', vendor: 'J\'s Cafe', Subsidies: 235, operationalSpend: 0, marketingSpend: 0, total: 235 },
  { period: 'Oct 25th', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 1st', vendor: 'Koi Sushi', Subsidies: 450, operationalSpend: 205.88, marketingSpend: 73.53, total: 729.41 },
  { period: 'Nov 1st', vendor: 'Fusion Express', Subsidies: 600, operationalSpend: 0, marketingSpend: 0, total: 600 },
  { period: 'Nov 1st', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Nov 1st', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 8th', vendor: 'Koi Sushi', Subsidies: 450, operationalSpend: 205.88, marketingSpend: 73.53, total: 729.41 },
  { period: 'Nov 8th', vendor: 'Fusion Express', Subsidies: 650, operationalSpend: 0, marketingSpend: 0, total: 650 },
  { period: 'Nov 8th', vendor: 'J\'s Cafe', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 8th', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 15th', vendor: 'Koi Sushi', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Nov 15th', vendor: 'Fusion Express', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Nov 15th', vendor: 'J\'s Cafe', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Nov 15th', vendor: 'Well Pub', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Nov 22nd', vendor: 'Koi Sushi', Subsidies: 450, operationalSpend: 205.88, marketingSpend: 73.53, total: 729.41 },
  { period: 'Nov 22nd', vendor: 'Fusion Express', Subsidies: 650, operationalSpend: 0, marketingSpend: 0, total: 650 },
  { period: 'Nov 22nd', vendor: 'J\'s Cafe', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 22nd', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 29th', vendor: 'Koi Sushi', Subsidies: 450, operationalSpend: 205.88, marketingSpend: 73.53, total: 729.41 },
  { period: 'Nov 29th', vendor: 'Fusion Express', Subsidies: 650, operationalSpend: 0, marketingSpend: 0, total: 650 },
  { period: 'Nov 29th', vendor: 'J\'s Cafe', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Nov 29th', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'Dec 5th', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'Dec 5th', vendor: 'Fusion Express', Subsidies: 400, operationalSpend: 0, marketingSpend: 0, total: 400 },
  { period: 'Dec 5th', vendor: 'J\'s Cafe', Subsidies: 150, operationalSpend: 0, marketingSpend: 0, total: 150 },
  { period: 'Dec 5th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Dec 7th', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'Dec 7th', vendor: 'Fusion Express', Subsidies: 400, operationalSpend: 0, marketingSpend: 0, total: 400 },
  { period: 'Dec 7th', vendor: 'J\'s Cafe', Subsidies: 150, operationalSpend: 0, marketingSpend: 0, total: 150 },
  { period: 'Dec 7th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Dec 12th', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'Dec 12th', vendor: 'Fusion Express', Subsidies: 400, operationalSpend: 0, marketingSpend: 0, total: 400 },
  { period: 'Dec 12th', vendor: 'J\'s Cafe', Subsidies: 150, operationalSpend: 0, marketingSpend: 0, total: 150 },
  { period: 'Dec 12th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Dec 14th', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'Dec 14th', vendor: 'Fusion Express', Subsidies: 400, operationalSpend: 0, marketingSpend: 0, total: 400 },
  { period: 'Dec 14th', vendor: 'J\'s Cafe', Subsidies: 150, operationalSpend: 0, marketingSpend: 0, total: 150 },
  { period: 'Dec 14th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Jan 23rd', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'Jan 23rd', vendor: 'Fusion Express', Subsidies: 350, operationalSpend: 0, marketingSpend: 0, total: 350 },
  { period: 'Jan 23rd', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Jan 23rd', vendor: 'Well Pub', Subsidies: 210, operationalSpend: 0, marketingSpend: 0, total: 210 },
  { period: 'Jan 25th', vendor: 'Koi Sushi', Subsidies: 300, operationalSpend: 205.88, marketingSpend: 73.53, total: 579.41 },
  { period: 'Jan 25th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'Jan 25th', vendor: 'J\'s Cafe', Subsidies: 235, operationalSpend: 0, marketingSpend: 0, total: 235 },
  { period: 'Jan 25th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Jan 30th', vendor: 'Koi Sushi', Subsidies: 300, operationalSpend: 205.88, marketingSpend: 73.53, total: 579.41 },
  { period: 'Jan 30th', vendor: 'J\'s Cafe', Subsidies: 270, operationalSpend: 0, marketingSpend: 0, total: 270 },
  { period: 'Jan 30th', vendor: 'Well Pub', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'February 1st', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'February 1st', vendor: 'J\'s Cafe', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'February 1st', vendor: 'Well Pub', Subsidies: 300, operationalSpend: 0, marketingSpend: 0, total: 300 },
  { period: 'February 6th', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'February 6th', vendor: 'J\'s Cafe', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'February 6th', vendor: 'Well Pub', Subsidies: 300, operationalSpend: 0, marketingSpend: 0, total: 300 },
  { period: 'February 8th', vendor: 'Koi Sushi', Subsidies: 250, operationalSpend: 205.88, marketingSpend: 73.53, total: 529.41 },
  { period: 'February 8th', vendor: 'J\'s Cafe', Subsidies: 250, operationalSpend: 0, marketingSpend: 0, total: 250 },
  { period: 'February 8th', vendor: 'Well Pub', Subsidies: 300, operationalSpend: 0, marketingSpend: 0, total: 300 },
  { period: 'February 13th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'February 13th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'February 13th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'February 13th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Feb 15th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'Feb 15th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'Feb 15th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Feb 15th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Feb 19th', vendor: 'Koi Sushi', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 19th', vendor: 'Fusion Express', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 19th', vendor: 'J\'s Cafe', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 19th', vendor: 'Well Pub', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 22nd', vendor: 'Koi Sushi', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 22nd', vendor: 'Fusion Express', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 22nd', vendor: 'J\'s Cafe', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 22nd', vendor: 'Well Pub', Subsidies: 0, operationalSpend: 0, marketingSpend: 0, total: 0 },
  { period: 'Feb 27th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'Feb 27th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'Feb 27th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'Feb 27th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'February 29th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'February 29th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'February 29th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'February 29th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 5th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 5th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 5th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 5th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 7th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 7th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 7th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 7th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 12th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 12th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 12th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 12th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 14th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 14th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 14th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 14th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 19th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 19th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 19th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 19th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 21st', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 21st', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 21st', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 21st', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 26th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 26th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 26th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 26th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 28th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'March 28th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'March 28th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'March 28th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 2nd', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 2nd', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 2nd', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 2nd', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 4th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 4th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 4th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 4th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 9th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 9th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 9th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 9th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 11th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 11th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 11th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 11th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 16th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 16th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 16th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 16th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 18th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 18th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 18th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 18th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 23rd', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 23rd', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 23rd', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 23rd', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 25th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 25th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 25th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 25th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 30th', vendor: 'Koi Sushi', Subsidies: 350, operationalSpend: 205.88, marketingSpend: 73.53, total: 629.41 },
  { period: 'April 30th', vendor: 'Fusion Express', Subsidies: 450, operationalSpend: 0, marketingSpend: 0, total: 450 },
  { period: 'April 30th', vendor: 'J\'s Cafe', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
  { period: 'April 30th', vendor: 'Well Pub', Subsidies: 200, operationalSpend: 0, marketingSpend: 0, total: 200 },
];

// Calculate total subsidy spent directly from the detailed data
const totalSubsidySpent = detailedSpendingOverTime.reduce((sum, item) => sum + item.Subsidies, 0);

// Calculate total operational and marketing spend from the detailed data
const totalOperationalSpend = detailedSpendingOverTime.reduce((sum, item) => sum + (item.operationalSpend || 0), 0);
const totalMarketingSpend = detailedSpendingOverTime.reduce((sum, item) => sum + (item.marketingSpend || 0), 0);

// Set total actual spent to be the sum of all categories
const totalActualSpent = totalSubsidySpent + totalOperationalSpend + totalMarketingSpend;

// Update budget allocation with calculated actual spent for each category.
const budgetAllocationWithSpent = budgetAllocation.map(item => {
    if (item.category === 'Subsidies') {
        return { ...item, spent: totalSubsidySpent };
    }
    if (item.category === 'Marketing') {
        return { ...item, spent: totalMarketingSpend };
    }
    if (item.category === 'Operations') {
        return { ...item, spent: totalOperationalSpend };
    }
    return { ...item, spent: 0 }; // Default for any other categories
});


const financialData = {
  totalBudget: totalBudget,
  totalSpent: totalActualSpent, // Overall total spent (now includes subsidies, ops, and marketing)
  budgetAllocation: budgetAllocationWithSpent, // Used for Budget vs Actual chart
  detailedSpendingOverTime: detailedSpendingOverTime,
  // Add overall totals for operational and marketing spend (derived from detailed data)
  totalOperationalSpend: totalOperationalSpend,
  totalMarketingSpend: totalMarketingSpend,
};

export default financialData;