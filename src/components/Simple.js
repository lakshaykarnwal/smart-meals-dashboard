// src/components/SimplePdfEmbed.jsx
import React from 'react';

function SimplePdfEmbed({ pdfUrl, onContinue }) {
  // Log the URL being used for the iframe src
  console.log("SimplePdfEmbed: Embedding PDF from URL:", pdfUrl);

  return (
    <div className="pdf-embed-container bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Project Overview</h2>

      {/* Use an iframe to embed the PDF */}
      {/* Set the src to the pdfUrl prop */}
      {/* Add styles for responsiveness and appearance */}
      <div className="pdf-display border border-gray-300 rounded overflow-hidden"
           style={{ width: '100%', height: '600px', margin: '0 auto' }}> {/* Set a fixed height or adjust as needed */}
        <iframe
          src={pdfUrl}
          title="Project Overview PDF"
          width="100%"
          height="100%"
          style={{ border: 'none' }} // Remove iframe border
        >
          {/* Fallback content if the browser doesn't support iframes or PDF embedding */}
          Your browser does not support iframes. You can download the PDF here: <a href={pdfUrl}>Download PDF</a>.
        </iframe>
      </div>

      {/* The continue button */}
      <div className="text-center mt-6">
        <button
          onClick={onContinue}
          className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200 ease-in-out"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SimplePdfEmbed;
