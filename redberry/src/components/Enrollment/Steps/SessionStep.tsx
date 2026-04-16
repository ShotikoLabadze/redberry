import "./SessionStep.css";

import IconSet from "../../../assets/Icon_Set.png";
import IconTitle from "../../../assets/Icon_Title.png";

import hybridIcon from "../../../assets/hybrid-icon.png";
import inPersonIcon from "../../../assets/in-person-icon.png";
import onlineIcon from "../../../assets/online-icon.png";

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

  const getSessionIcon = (sessionName: string) => {
    if (!sessionName) return onlineIcon;
    const name = sessionName.toLowerCase();

    if (name.includes("online")) return onlineIcon;
    if (name.includes("hybrid")) return hybridIcon;
    if (name.includes("person")) return inPersonIcon;

    return onlineIcon;
  };

  return (
    <div
      className={`session-step-container ${
        selectedId ? "filled" : isActive ? "active" : "disabled"
      }`}
    >
      <div className="step-header-frame">
        <div className="header-info-group">
          <div className="step-number-circle">3</div>
          <h4 className="step-title-text">Session Type</h4>
        </div>
        <img
          src={isActive ? IconSet : IconTitle}
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
                  type="button"
                >
                  <div className="card-main-content">
                    <img
                      src={getSessionIcon(session.name)}
                      alt={session.name}
                      className="session-icon-main"
                    />

                    <div className="session-text-details">
                      <div className="title-location-group">
                        <span className="session-name-title">
                          {session.name.toLowerCase().includes("online")
                            ? "Online"
                            : "In-Person"}
                        </span>
                        <div className="location-row">
                          <span className="location-text">
                            {session.name.toLowerCase().includes("online")
                              ? "Google Meet"
                              : session.location || "Chavchavadze St.34"}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`session-price-modifier ${
                          Number(session.priceModifier) <= 0
                            ? "is-included"
                            : ""
                        }`}
                      >
                        {Number(session.priceModifier) > 0
                          ? `+ $${Number(session.priceModifier).toFixed(0)}`
                          : "Included"}
                      </span>
                    </div>
                  </div>
                </button>

                <div
                  className={`session-status-tag ${isWarning ? "warning" : ""} ${isFull ? "full" : ""}`}
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
