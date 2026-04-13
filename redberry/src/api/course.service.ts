import API from "./axios";

export const getCourses = async (sort = "newest", page = 1) => {
  const response = await API.get(`/courses?sort=${sort}&page=${page}`);
  return response.data;
};

export const getFeatured = async () => {
  const response = await API.get("/courses/featured");
  return response.data;
};

export const getInProgress = async () => {
  const response = await API.get("/courses/in-progress");
  return response.data;
};

export const GetCourseById = async (id: string | number) => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};

export const getWeeklySchedules = async (courseId: string | number) => {
  const response = await API.get(`/courses/${courseId}/weekly-schedules`);
  return response.data;
};

export const getTimeSlots = async (
  courseId: string | number,
  scheduleId: number,
) => {
  const response = await API.get(
    `/courses/${courseId}/time-slots?weekly_schedule_id=${scheduleId}`,
  );
  return response.data;
};

export const getSessionTypes = async (
  courseId: string | number,
  scheduleId: number,
  slotId: number,
) => {
  const response = await API.get(
    `/courses/${courseId}/session-types?weekly_schedule_id=${scheduleId}&time_slot_id=${slotId}`,
  );
  return response.data;
};

export const enrollCourse = async (data: {
  courseId: number;
  courseScheduleId: number;
  force: boolean;
}) => {
  const response = await API.post("/enrollments", data);
  return response.data;
};

export const completeCourse = async (enrollmentId: number) => {
  const response = await API.patch(`/enrollments/${enrollmentId}/complete`);
  return response.data;
};

export const deleteEnrollment = async (enrollmentId: number) => {
  const response = await API.delete(`/enrollments/${enrollmentId}`);
  return response.data;
};
