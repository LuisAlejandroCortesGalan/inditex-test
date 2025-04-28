import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner" aria-live="polite" aria-busy="true">
      <div className="spinner"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
