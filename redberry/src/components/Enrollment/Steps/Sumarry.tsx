import React from "react";
import "./Sumarry.css";

interface SummaryProps {
  basePrice: number;
  selectedSession: any;
  onEnroll: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const Summary: React.FC<SummaryProps> = ({
  basePrice,
  selectedSession,
  onEnroll,
  isLoading,
  isDisabled,
}) => {
  const sessionModifier = selectedSession
    ? Number(selectedSession.priceModifier)
    : 0;
  const totalPrice = basePrice + sessionModifier;

  return (
    <div className="enrollment-summary-card">
      <div className="price-main-row">
        <span className="label">Total Price</span>
        <span className="total-amount">${totalPrice}</span>
      </div>

      <div className="price-breakdown">
        <div className="breakdown-item">
          <span>Base Price</span>
          <span className="value">+ $0</span>
        </div>
        <div className="breakdown-item">
          <span>Session Type</span>
          <span className="value">
            {sessionModifier > 0 ? `+ $${sessionModifier}` : "+ $0"}
          </span>
        </div>
      </div>

      <button
        className={`enroll-submit-btn ${isDisabled ? "disabled" : ""}`}
        onClick={onEnroll}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? "Processing..." : "Enroll Now"}
      </button>
    </div>
  );
};

export default Summary;
