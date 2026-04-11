import { useEffect, useState } from "react";
import { getWeeklySchedules } from "../../api/course.service";
import "./Enrollment.css";

interface EnrollmentProps {
  courseId: string | number;
}

const Enrollment = ({ courseId }: EnrollmentProps) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getWeeklySchedules(courseId);
        setSchedules(response.data);
      } catch (err) {
        console.error("error fetching schedules:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [courseId]);

  const handleSelect = (schedule: any) => {
    setSelectedSchedule(schedule);
  };

  if (loading) return <div>Loading Schedules...</div>;

  return (
    <div className="enrollment-system">
      <div
        className={`step-container ${selectedSchedule ? "filled" : "active"}`}
      >
        <div className="step-header">
          <div className="step-info">
            <div className="step-circle">1</div>
            <h4>Weekly Schedule</h4>
          </div>

          <span className="step-status-icon">
            {selectedSchedule ? "✓" : "↓"}
          </span>
        </div>

        <div className="step-content">
          <div className="options-grid">
            {schedules.map((s) => (
              <button
                key={s.id}
                className={`opt-btn ${selectedSchedule?.id === s.id ? "selected" : ""}`}
                onClick={() => handleSelect(s)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="step-container disabled">
        <div className="step-header">
          <div className="step-info">
            <div className="step-circle">2</div>
            <h4>Time Slot</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
