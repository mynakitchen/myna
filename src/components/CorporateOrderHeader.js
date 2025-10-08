import React from 'react';
import './CorporateOrderForm.css';

const CorporateOrderHeader = () => {
  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="form-header">
      <div className="container">
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Home
        </button>
        <h1 className="form-title">Corporate & Bulk Orders</h1>
        <p className="form-subtitle">
          Let us know your requirements and we'll create a customized meal solution for your team
        </p>
      </div>
    </div>
  );
};

export default CorporateOrderHeader;


