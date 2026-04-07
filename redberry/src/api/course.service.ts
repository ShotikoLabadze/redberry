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
