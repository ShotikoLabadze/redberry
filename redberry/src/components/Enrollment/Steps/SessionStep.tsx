interface SessionStepProps {
  selectedTime: any;
  selectedSession: any;
  sessions: any[];
  onSelect: (session: any) => void;
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
      className={`step-container ${selectedId ? "filled" : isActive ? "active" : "disabled"}`}
    >
      <div className="step-header">
        <div className="step-info">
          <div className="step-circle">3</div>
          <h4>Session Type</h4>
        </div>
        <img
          src={isActive ? "/Icon_Set.png" : "/Icon_Title.png"}
          alt="toggle"
          className="step-icon"
        />
      </div>

      {isActive && (
        <div className="step-content">
          <div className="options-grid session-grid">
            {sessions.map((session) => (
              <div key={session.id} className="opt-wrapper">
                <button
                  disabled={session.availableSeats === 0}
                  className={`opt-btn opt-card ${selectedId === session.id ? "selected" : ""}`}
                  onClick={() => onSelect(session)}
                >
                  <div className="opt-icon">
                    <img src={`/${session.name}-icon.png`} alt={session.name} />
                  </div>
                  <span className="opt-title">
                    {session.name.charAt(0).toUpperCase() +
                      session.name.slice(1)}
                  </span>
                  <span className="opt-subtitle">
                    {session.name === "online"
                      ? "Google Meet"
                      : session.location || "Chavchavadze St.34"}
                  </span>
                  <span
                    className={`opt-price ${session.name === "online" ? "is-included" : ""}`}
                  >
                    {Number(session.priceModifier) > 0
                      ? `+ $${Number(session.priceModifier).toFixed(0)}`
                      : "Included"}
                  </span>
                </button>
                <div
                  className={`opt-status ${session.availableSeats <= 5 ? "warning" : ""}`}
                >
                  {session.availableSeats <= 5 &&
                    session.availableSeats > 0 && (
                      <span className="status-icon">⚠️</span>
                    )}
                  {session.availableSeats === 0
                    ? "No Seats Remaining"
                    : session.availableSeats <= 5
                      ? `Only ${session.availableSeats} Seats Remaining`
                      : `${session.availableSeats} Seats Available`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionStep;
