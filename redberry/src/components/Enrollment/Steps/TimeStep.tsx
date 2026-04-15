import "./TimeStep.css";

interface TimeStepProps {
  selectedSchedule: any;
  selectedTime: any;
  loadingSlots: boolean;
  availableTimes: any[];
  onSelect: (slot: any) => void;
}

const TimeStep = ({
  selectedSchedule,
  selectedTime,
  loadingSlots,
  availableTimes,
  onSelect,
}: TimeStepProps) => {
  const isActive = !!selectedSchedule;
  const isFilled = !!selectedTime;

  return (
    <div
      className={`time-step-container ${
        isFilled ? "filled" : isActive ? "active" : "disabled"
      }`}
    >
      <div className="step-header-frame">
        <div className="header-info-group">
          <div className="step-number-circle">2</div>
          <h4 className="step-title-text">Time Slot</h4>
        </div>
        <img
          src={isActive ? "/Icon_Set.png" : "/Icon_Title.png"}
          alt="toggle"
          className="step-toggle-icon"
        />
      </div>

      {isActive && (
        <div className="time-slots-content">
          {loadingSlots ? (
            <div className="loading-text">Loading Slots...</div>
          ) : (
            <div className="time-options-grid">
              {availableTimes.map((slot) => {
                const isSelected = selectedTime?.id === slot.id;

                const iconName = slot.label.split(" ")[0];
                const iconPath = `/${iconName}.png`;

                return (
                  <button
                    key={slot.id}
                    className={`time-opt-card ${isSelected ? "selected" : ""}`}
                    onClick={() => onSelect(slot)}
                    type="button"
                  >
                    <div className="time-card-internal">
                      <img
                        src={iconPath}
                        alt={iconName}
                        className="time-card-icon"
                      />
                      <div className="time-text-bundle">
                        <span className="time-label">{slot.label}</span>
                        <span className="time-hours">
                          {slot.startTime.slice(0, 5)} –{" "}
                          {slot.endTime.slice(0, 5)}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeStep;
