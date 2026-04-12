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
      className={`step-container ${isFilled ? "filled" : isActive ? "active" : "disabled"}`}
    >
      <div className="step-header">
        <div className="step-info">
          <div className="step-circle">2</div>
          <h4>Time Slot</h4>
        </div>
        <img
          src={isActive ? "/Icon_Set.png" : "/Icon_Title.png"}
          alt="toggle"
          className="step-icon"
        />
      </div>

      {isActive && (
        <div className="step-content">
          {loadingSlots ? (
            <div className="loading-text">Loading Slots...</div>
          ) : (
            <div className="options-grid">
              {availableTimes.map((slot) => (
                <button
                  key={slot.id}
                  className={`opt-btn slot-btn ${selectedTime?.id === slot.id ? "selected" : ""}`}
                  onClick={() => onSelect(slot)}
                >
                  <div className="slot-wrapper">
                    <span className="slot-label">{slot.label}</span>
                    <span className="slot-hours">
                      {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeStep;
