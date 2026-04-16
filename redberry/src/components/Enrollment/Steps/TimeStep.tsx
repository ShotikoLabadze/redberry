import "./TimeStep.css";

import IconSet from "../../../assets/Icon_Set.png";
import IconTitle from "../../../assets/Icon_Title.png";

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

  const getTimeIcon = (label: string) => {
    const iconName = label.split(" ")[0];
    return new URL(`../../../assets/${iconName}.png`, import.meta.url).href;
  };

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
          src={isActive ? IconSet : IconTitle}
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

                return (
                  <button
                    key={slot.id}
                    className={`time-opt-card ${isSelected ? "selected" : ""}`}
                    onClick={() => onSelect(slot)}
                    type="button"
                  >
                    <div className="time-card-internal">
                      <img
                        src={getTimeIcon(slot.label)}
                        alt={iconName}
                        className="time-card-icon"
                      />
                      <div className="time-text-bundle">
                        <span className="time-label">{slot.label}</span>
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
