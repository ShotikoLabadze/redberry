import shortDay from "../../../utils/shortDay";

interface ScheduleStepProps {
  schedules: any[];
  selectedSchedule: any;
  onSelect: (schedule: any) => void;
}

const ScheduleStep = ({
  schedules,
  selectedSchedule,
  onSelect,
}: ScheduleStepProps) => (
  <div className={`step-container ${selectedSchedule ? "filled" : "active"}`}>
    <div className="step-header">
      <div className="step-info">
        <div className="step-circle">1</div>
        <h4>Weekly Schedule</h4>
      </div>
      <img src="/Icon_Set.png" alt="toggle" className="step-icon" />
    </div>
    <div className="step-content">
      <div className="options-grid">
        {schedules.map((s) => (
          <button
            key={s.id}
            className={`opt-btn ${selectedSchedule === s.id ? "selected" : ""}`}
            onClick={() => onSelect(s)}
          >
            {shortDay(s.label)}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default ScheduleStep;
