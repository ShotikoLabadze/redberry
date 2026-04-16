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
      <div className="summary-inner-frame">
        <div className="summary-total-price-row">
          <span className="total-label">Total Price</span>
          <div className="total-amount-wrapper">
            <span className="total-amount-text">${totalPrice}</span>
          </div>
        </div>

        <div className="summary-breakdown-group">
          <div className="breakdown-line">
            <span className="breakdown-label">Base Price</span>
            <div className="breakdown-value-wrapper">
              <span className="breakdown-value">+ ${basePrice}</span>
            </div>
          </div>

          <div className="breakdown-line">
            <span className="breakdown-label">Session Type</span>
            <div className="breakdown-value-wrapper">
              <span className="breakdown-value">
                {sessionModifier > 0 ? `+ $${sessionModifier}` : "+ $0"}
              </span>
            </div>
          </div>
        </div>

        <button
          className={`enroll-submit-btn ${isDisabled ? "disabled" : ""}`}
          onClick={onEnroll}
          disabled={isDisabled || isLoading}
        >
          <span className="btn-text">
            {isLoading ? "Processing..." : "Enroll Now"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
