import { useEffect, useState } from "react";
import {
  getSessionTypes,
  getTimeSlots,
  getWeeklySchedules,
} from "../../api/course.service";
import "./Enrollment.css";
import ScheduleStep from "./Steps/ScheduleStep";
import SessionStep from "./Steps/SessionStep";
import TimeStep from "./Steps/TimeStep";

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

  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [loadingSessions, setLoadingSessions] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
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

  useEffect(() => {
    const fetchSessions = async () => {
      if (!selectedTime) {
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
        console.error("error fetching sessions", err);
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

  if (loading) return <div className="loading-state">Loading Schedules...</div>;

  return (
    <div className="enrollment-system">
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
        onSelect={setSelectedTime}
      />

      <SessionStep
        selectedTime={selectedTime}
        selectedSession={selectedSession}
        sessions={sessions}
        onSelect={setSelectedSession}
      />
    </div>
  );
};

export default Enrollment;
