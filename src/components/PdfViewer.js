// src/components/PdfViewer.jsx
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// --- IMPORTANT: Set worker source to LOCAL file ---
// Ensure pdf.worker.min.js is directly in your public folder and named correctly (NOT .mjs).
// Use process.env.PUBLIC_URL to get the correct base path for your environment.
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

// Keep CDN line commented out
// //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function PDFViewer({ pdfUrl, onContinue }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(pdfUrl); // State to hold the file URL

  // Debugging effect to log the PDF URL and Worker URL when the component mounts or receives a new pdfUrl
  useEffect(() => {
    console.log("PDFViewer: Component mounted/pdfUrl changed.");
    console.log("PDFViewer: Using worker source:", pdfjs.GlobalWorkerOptions.workerSrc); // Log the worker source
    console.log("PDFViewer: Attempting to load PDF from:", pdfUrl);

    setFileUrl(pdfUrl); // Ensure the state is updated if pdfUrl prop changes
    setLoading(true); // Reset loading state when pdfUrl changes
    setError(null); // Clear error when pdfUrl changes

    // Optional: Basic fetch check to see if the browser can access the URL
    // The previous console output shows this returns 200, confirming file access.
    // Keeping it for completeness but the issue is likely post-fetch.
    fetch(pdfUrl)
      .then(response => {
        console.log(`PDFViewer: Fetch check for ${pdfUrl} status:`, response.status);
        if (!response.ok) {
          console.error("PDFViewer: Fetch check failed - PDF file not found or inaccessible:", response.status);
          // setError(`PDF file not found (${response.status}). Check that the file exists in your public folder and the path is correct.`);
        }
      })
      .catch(err => {
        console.error("PDFViewer: Fetch check error:", err);
        // setError(`Error accessing PDF file: ${err.message}`);
      });

  }, [pdfUrl]); // Re-run this effect if the pdfUrl prop changes

  function onDocumentLoadSuccess({ numPages }) {
    console.log("PDFViewer: Document loaded successfully!");
    console.log("PDFViewer: Number of pages received:", numPages); // Log number of pages
    if (numPages > 0) {
        setNumPages(numPages);
        setLoading(false);
        setError(null); // Clear any previous errors on success
    } else {
        // Handle case where document loads but reports 0 pages (shouldn't happen for valid PDF)
        console.error("PDFViewer: Document loaded but reported 0 pages.");
        setError("Document loaded but appears empty.");
        setLoading(false);
    }
  }

  function onDocumentLoadError(err) {
    console.error('PDFViewer: Error loading PDF document:', err); // Log the actual error object
    // Provide a more detailed error message to the user
    let errorMessage = 'Failed to load PDF.';
    if (err && err.message) {
      errorMessage += ` Error: ${err.message}`;
    }
     if (err && err.name) {
       errorMessage += ` (${err.name})`;
    }
    setError(errorMessage);
    setLoading(false);
  }

  // Fallback button to continue even if PDF fails
  const renderFallbackButton = () => (
    <div className="text-center mt-6">
      {/* Only show the message if there's an error, not just while loading */}
      {error && <p className="text-amber-600 mb-4">If you're seeing this message after loading, the PDF may not be loading correctly.</p>}
      <button
        onClick={onContinue}
        className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200 ease-in-out"
      >
        Skip and Continue to Dashboard
      </button>
    </div>
  );

  return (
    // Added inline styles to ensure container is visible and has minimum dimensions
    <div className="pdf-viewer-container bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8"
         style={{ minHeight: '500px', position: 'relative' }}> {/* Added minHeight and position */}
      <h2 className="text-2xl font-bold mb-4 text-center">Project Overview</h2>

      {/* Show loading message only while loading */}
      {loading && !error && (
        <div className="text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> {/* Centered loading */}
          <p className="text-gray-600 mb-4">Loading PDF...</p>
          {/* Optionally show fallback button even during loading after a delay */}
          {/* {setTimeout(renderFallbackButton, 5000)} */} {/* Example: show after 5 seconds */}
        </div>
      )}

      {/* Show error message and fallback button if there's an error */}
      {error && (
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          {renderFallbackButton()}
        </div>
      )}

      {/* Render PDF only if not loading and no error */}
      {!loading && !error && (
        <>
          {/* Added inline styles to ensure display area is visible */}
          <div className="pdf-display border border-gray-300 rounded overflow-hidden"
               style={{ width: '100%', height: 'auto', margin: '0 auto' }}> {/* Ensure dimensions */}
            <Document
              file={fileUrl} // Use the state variable
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="w-full" // Tailwind class, check if it sets display: flex or block
              renderMode="canvas" // Often more compatible for various PDFs
            >
              {/* Render the current page */}
              <Page
                key={`page_${pageNumber}`} // Key helps React re-render when pageNumber changes
                pageNumber={pageNumber}
                width={Math.min(800, window.innerWidth - 80)} // Keep responsive width
                renderTextLayer={true} // Re-enabled for potential text selection
                renderAnnotationLayer={true} // Re-enabled for potential annotations
              />
            </Document>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPageNumber(prevPageNumber => Math.max(1, prevPageNumber - 1))}
              disabled={pageNumber <= 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <p>Page {pageNumber} of {numPages}</p>
            <button
              onClick={() => setPageNumber(prevPageNumber => Math.min(numPages, prevPageNumber + 1))}
              disabled={pageNumber >= numPages}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={onContinue}
              className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Continue to Dashboard
            </button>
          </div>
        </>
      )}
       {/* Always show the fallback button if there's an error, regardless of loading state */}
       {/* Moved fallback button rendering logic inside the main return for clarity */}
    </div>
  );
}

export default PDFViewer;
