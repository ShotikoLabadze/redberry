import "./SessionStep.css";

interface SessionStepProps {
  selectedTime: any;
  selectedSession: any;
  sessions: any[];
  onSelect: (session: any) => void;
  loadingSessions: boolean;
}

const SessionStep = ({
  selectedTime,
  selectedSession,
  sessions,
  onSelect,
}: SessionStepProps) => {
  const isActive = !!selectedTime;
  const selectedId = selectedSession?.id;

  return (
    <div
      className={`session-step-container ${selectedId ? "filled" : isActive ? "active" : "disabled"}`}
    >
      <div className="step-header-frame">
        <div className="header-info-group">
          <div className="step-number-circle">3</div>
          <h4 className="step-title-text">Session Type</h4>
        </div>
        <img
          src={isActive ? "/Icon_Set.png" : "/Icon_Title.png"}
          alt="toggle"
          className="step-toggle-icon"
        />
      </div>

      {isActive && (
        <div className="sessions-content-grid">
          {sessions.map((session) => {
            const isSelected = selectedId === session.id;
            const isWarning =
              session.availableSeats <= 5 && session.availableSeats > 0;
            const isFull = session.availableSeats === 0;

            return (
              <div key={session.id} className="session-column">
                <button
                  disabled={isFull}
                  className={`session-type-card ${isSelected ? "selected" : ""}`}
                  onClick={() => onSelect(session)}
                >
                  <div className="card-main-content">
                    <img
                      src={`/${session.name}-icon.png`}
                      alt={session.name}
                      className="session-icon-main"
                    />

                    <div className="session-text-details">
                      <div className="title-location-group">
                        <span className="session-name-title">
                          {session.name === "online" ? "Online" : "In-Person"}
                        </span>
                        <div className="location-row">
                          <span className="location-text">
                            {session.name === "online"
                              ? "Google Meet"
                              : session.location || "Chavchavadze St.34"}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`session-price-modifier ${session.name === "online" ? "is-included" : ""}`}
                      >
                        {Number(session.priceModifier) > 0
                          ? `+ $${Number(session.priceModifier).toFixed(0)}`
                          : "Included"}
                      </span>
                    </div>
                  </div>
                </button>

                <div
                  className={`session-status-tag ${isWarning ? "warning" : ""}`}
                >
                  {isWarning && <span className="warning-mini-icon">⚠️</span>}
                  <span className="status-text">
                    {isFull
                      ? "No Seats Remaining"
                      : isWarning
                        ? `Only ${session.availableSeats} Seats Remaining`
                        : `${session.availableSeats} Seats Available`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SessionStep;
