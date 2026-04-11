import { useEffect, useState } from "react";
import { getTimeSlots, getWeeklySchedules } from "../../api/course.service";
import shortDay from "../../utils/shortDay";
import "./Enrollment.css";

interface EnrollmentProps {
  courseId: string | number;
}

const Enrollment = ({ courseId }: EnrollmentProps) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getWeeklySchedules(courseId);
        setSchedules(response.data);
      } catch (err) {
        console.error("error fetching schedules:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [courseId]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedSchedule) {
        setAvailableTimes([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const response = await getTimeSlots(courseId, selectedSchedule.id);
        setAvailableTimes(response.data);
      } catch (err) {
        console.error("error fetching slots", err);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedSchedule, courseId]);

  const handleSelect = (schedule: any) => {
    setSelectedSchedule(schedule);
    setSelectedTime(null);
  };

  if (loading) return <div className="loading-state">Loading Schedules...</div>;

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
          <img src="/Icon_Set.png" alt="toggle" className="step-icon" />
        </div>

        <div className="step-content">
          <div className="options-grid">
            {schedules.map((s) => (
              <button
                key={s.id}
                className={`opt-btn ${selectedSchedule?.id === s.id ? "selected" : ""}`}
                onClick={() => handleSelect(s)}
              >
                {shortDay(s.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`step-container ${selectedTime ? "filled" : selectedSchedule ? "active" : "disabled"}`}
      >
        <div className="step-header">
          <div className="step-info">
            <div className="step-circle">2</div>
            <h4>Time Slot</h4>
          </div>
          <img
            src={selectedSchedule ? "/Icon_Set.png" : "/Icon_Title.png"}
            alt="toggle"
            className="step-icon"
          />
        </div>

        {selectedSchedule && (
          <div className="step-content">
            {loadingSlots ? (
              <div className="loading-text">Loading Slots...</div>
            ) : (
              <div className="options-grid">
                {availableTimes.map((slot) => (
                  <button
                    key={slot.id}
                    className={`opt-btn slot-btn ${selectedTime?.id === slot.id ? "selected" : ""}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <div className="slot-wrapper">
                      <span className="slot-label">{slot.label}</span>
                      <span className="slot-hours">
                        {slot.startTime.slice(0, 5)} -{" "}
                        {slot.endTime.slice(0, 5)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="step-container disabled">
        <div className="step-header">
          <div className="step-info">
            <div className="step-circle">3</div>
            <h4>Session Type</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
