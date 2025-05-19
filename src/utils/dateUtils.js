// src/utils/dateUtils.js

// Helper function to parse dates (basic parsing for "Month Day" format)
export const parsePeriodDate = (period) => {
    const parts = period.replace('th', '').replace('st', '').replace('nd', '').replace('rd', '').split(' ');
    if (parts.length < 2) return null;
    const month = parts[0];
    const day = parseInt(parts[1], 10);
    let year = 2023; // Assume 2023 for Sep-Dec
    if (['Jan', 'February', 'March', 'April', 'Feb', 'Mrch'].includes(month)) {
        year = 2024; // Assume 2024 for Jan-April
    }
    const monthMap = {
        'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
        'Jan': 0, 'February': 1, 'March': 2, 'April': 3, 'Feb': 1, 'Mrch': 2
    };
     const monthIndex = monthMap[month];
     if (monthIndex === undefined) return null;
  
     return new Date(year, monthIndex, day);
  };