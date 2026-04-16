import { useEffect, useState } from "react";
import {
  enrollCourse,
  getSessionTypes,
  getTimeSlots,
  getWeeklySchedules,
} from "../../api/course.service";
import "./Enrollment.css";
import ConflictModal from "./Steps/ConflictModal";
import ScheduleStep from "./Steps/ScheduleStep";
import SessionStep from "./Steps/SessionStep";
import Summary from "./Steps/Sumarry";
import TimeStep from "./Steps/TimeStep";

import EnrollConfirmedIcon from "../../assets/enroll-confirmed.png";

interface EnrollmentProps {
  courseId: string | number;
  basePrice: string | number;
  courseTitle?: string;
}

const Enrollment = ({ courseId, basePrice, courseTitle }: EnrollmentProps) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [loadingSessions, setLoadingSessions] = useState(false);

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [conflictData, setConflictData] = useState<any>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await getWeeklySchedules(courseId);
        setSchedules(response.data);
      } catch (err) {
        console.error("Error fetching schedules:", err);
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
        console.error("Error fetching slots:", err);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedSchedule, courseId]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!selectedTime || !selectedSchedule) {
        setSessions([]);
        return;
      }
      setLoadingSessions(true);
      try {
        const response = await getSessionTypes(
          courseId,
          selectedSchedule.id,
          selectedTime.id,
        );
        setSessions(response.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, [selectedTime, selectedSchedule, courseId]);

  const handleScheduleSelect = (schedule: any) => {
    setSelectedSchedule(schedule);
    setSelectedTime(null);
    setSelectedSession(null);
  };

  const handleEnroll = async (forceEnroll = false) => {
    if (!selectedSession) return;

    setIsEnrolling(true);
    try {
      const scheduleIdToSend =
        selectedSession.courseScheduleId || selectedSession.id;

      const payload = {
        courseId: Number(courseId),
        courseScheduleId: Number(scheduleIdToSend),
        force: forceEnroll,
      };

      await enrollCourse(payload);
      setShowSuccess(true);
      setConflictData(null);
    } catch (err: any) {
      if (err.response?.status === 409) {
        const conflictRaw = err.response.data?.data?.[0] || err.response.data;

        if (conflictRaw) {
          setConflictData({
            courseName: conflictRaw.course?.title || "Existing Course",
            schedule:
              conflictRaw.schedule?.weeklySchedule?.label || "Same Days",
            time: conflictRaw.schedule?.timeSlot?.label || "Same Time",
          });
        }
      } else {
        const msg = err.response?.data?.message || "Registration failed";
        alert(msg);
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) return <div className="loading-state">Loading Schedules...</div>;

  return (
    <div className="enrollment-system">
      {showSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
            <img
              src={EnrollConfirmedIcon}
              alt="Success"
              className="success-modal-icon"
            />
            <h2 className="success-modal-title">Enrollment Confirmed!</h2>
            <p className="success-modal-text">
              You've successfully enrolled to the <br />
              <strong>"{courseTitle || "Course"}"</strong> Course!
            </p>
            <button
              className="success-modal-done-btn"
              onClick={() => window.location.reload()}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {conflictData && (
        <ConflictModal
          conflictData={conflictData}
          onCancel={() => setConflictData(null)}
          onConfirm={() => handleEnroll(true)}
        />
      )}

      <ScheduleStep
        schedules={schedules}
        selectedSchedule={selectedSchedule}
        onSelect={handleScheduleSelect}
      />

      <TimeStep
        selectedSchedule={selectedSchedule}
        selectedTime={selectedTime}
        loadingSlots={loadingSlots}
        availableTimes={availableTimes}
        onSelect={(slot) => {
          setSelectedTime(slot);
          setSelectedSession(null);
        }}
      />

      <SessionStep
        selectedTime={selectedTime}
        selectedSession={selectedSession}
        sessions={sessions}
        onSelect={setSelectedSession}
        loadingSessions={loadingSessions}
      />

      <Summary
        basePrice={Number(basePrice)}
        selectedSession={selectedSession}
        onEnroll={() => handleEnroll(false)}
        isLoading={isEnrolling}
        isDisabled={!selectedSession}
      />
    </div>
  );
};

export default Enrollment;
