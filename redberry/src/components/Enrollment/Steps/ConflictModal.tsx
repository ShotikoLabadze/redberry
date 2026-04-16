import React from "react";
import "./ConflictModal.css";

interface ConflictData {
  courseName: string;
  schedule: string;
  time: string;
}

interface Props {
  conflictData: ConflictData;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConflictModal: React.FC<Props> = ({
  conflictData,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="conflict-modal-overlay">
      <div className="feedback-modal">
        <div className="frame-120">
          <div className="frame-119">
            <div className="frame-103">
              <div className="modal-icons">
                <svg
                  width="94"
                  height="94"
                  viewBox="0 0 94 94"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M47 12L12 77H82L47 12Z"
                    stroke="#F4A316"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M47 35V55"
                    stroke="#F4A316"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="47" cy="67" r="4" fill="#F4A316" />
                </svg>
              </div>

              <div className="frame-102">
                <h2 className="modal-title">Enrollment Conflict</h2>
                <p className="modal-description">
                  You are already enrolled in
                  <strong> “{conflictData?.courseName}” </strong>
                  with the same schedule:
                  <strong>
                    {" "}
                    {conflictData?.schedule} at {conflictData?.time}
                  </strong>
                </p>
              </div>
            </div>

            <div className="frame-482">
              <button className="cta-button-secondary" onClick={onConfirm}>
                <span className="btn-text-purple">Continue Anyway</span>
              </button>
              <button className="cta-button-primary" onClick={onCancel}>
                <span className="btn-text-white">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
