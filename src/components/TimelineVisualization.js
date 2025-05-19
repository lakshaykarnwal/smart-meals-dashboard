// src/components/TimelineVisualization.jsx
import React from 'react';
import timelineData from '../data/timelineData'; // Import the timeline data

const TimelineVisualization = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Project Timeline</h2>

      <div className="relative wrap overflow-hidden p-10 h-full">
        {/* Vertical line to connect events */}
        <div className="border-2-2 absolute border-l-2 border-gray-200 h-full left-1/2 transform -translate-x-1/2"></div>

        {timelineData.map((item, index) => (
          <div key={item.id} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
            <div className="order-1 w-5/12"></div> {/* Empty div for spacing */}
            <div className="z-10 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">{item.id}</h1>
            </div>
            <div className="order-1 bg-gray-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
              <h3 className="mb-3 font-bold text-gray-800 text-xl">{item.phase}</h3>
              <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{item.description}</p>
              <p className="text-xs text-gray-600 mt-2">Duration/Period: {item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineVisualization;