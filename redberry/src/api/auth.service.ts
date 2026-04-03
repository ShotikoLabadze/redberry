import API from "./axios";

const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export const register = async (data: FormData) => {
  try {
    const response = await API.post("/register", data);

    return response.data;
  } catch (err: any) {
    const mess = err.response?.data?.message || "Registration failed";
    throw new Error(mess);
  }
};
