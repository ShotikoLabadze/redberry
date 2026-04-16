import React from "react";
import shortDay from "../../../utils/shortDay";
import "./ScheduleStep.css";

import IconSet from "../../../assets/Icon_Set.png";

interface ScheduleStepProps {
  schedules: any[];
  selectedSchedule: any;
  onSelect: (schedule: any) => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  schedules,
  selectedSchedule,
  onSelect,
}) => {
  const isFilled = !!selectedSchedule;

  return (
    <div
      className={`weekly-schedule-container ${isFilled ? "filled" : "active"}`}
    >
      <div className="step-header-frame">
        <div className="header-info-group">
          <div className="step-number-circle">1</div>
          <h4 className="step-title-text">Weekly Schedule</h4>
        </div>

        <img src={IconSet} alt="toggle" className="step-toggle-icon" />
      </div>

      <div className="week-options-grid">
        {schedules.map((s) => {
          const isSelected = selectedSchedule?.id === s.id;
          return (
            <button
              key={s.id}
              className={`week-opt-btn ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(s)}
              type="button"
            >
              <span className="week-label-text">{shortDay(s.label)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleStep;
