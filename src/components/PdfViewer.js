// src/components/PDFViewer.jsx
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// You need to set the worker source for pdf.js.
// This path might vary slightly based on your react-pdf version and setup.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ pdfUrl, onContinue }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Start on page 1
  const [scale, setScale] = useState(1.0); // Initial zoom level

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Ensure it starts on the first page when a new document loads
    setScale(1.0); // Reset zoom when new document loads
  }

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(1, prevPageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(numPages, prevPageNumber + 1));
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 3.0)); // Max zoom to 3.0
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Min zoom to 0.5
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Project Showcase: Smart Meals Initiative</h2>

      <div className="flex justify-center items-center gap-2 mb-4"> {/* Zoom controls container */}
        <button
          onClick={zoomOut}
          className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md font-semibold hover:bg-gray-300 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          disabled={scale <= 0.5}
        >
          Zoom Out
        </button>
        <span className="text-gray-600 text-sm">{Math.round(scale * 100)}%</span>
        <button
          onClick={zoomIn}
          className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md font-semibold hover:bg-gray-300 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          disabled={scale >= 3.0}
        >
          Zoom In
        </button>
      </div>

      <div className="pdf-container my-6 border border-gray-300 rounded-md overflow-hidden flex justify-center items-center flex-col">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          className="w-full flex justify-center" // Center the document and its pages
        >
          {/* Render only the current page */}
          <Page
            key={`page_${pageNumber}`} // Key helps React re-render when pageNumber changes
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page-canvas" // Apply styles directly
            scale={scale} // Pass the scale prop here
            // Removing fixed width to allow scale to control size.
            // If you still need a max width, you might need to adjust parent container or calculate width based on scale.
          />
        </Document>
      </div>

      {numPages && (
        <div className="flex justify-between items-center mt-4 mb-6">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <p className="text-center text-gray-600">
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200 ease-in-out mt-4"
      >
        Continue to Dashboard
      </button>
    </div>
  );
};

export default PDFViewer;