import API from "./axios";

export const register = async (data: FormData) => {
  try {
    const response = await API.post("/register", data);

    return response.data;
  } catch (err: any) {
    const mess = err.response?.data?.message || "Registration failed";
    throw new Error(mess);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await API.post("/login", { email, password });
    return response.data;
  } catch (err: any) {
    const mess = err.response?.data?.message || "Login failed";
    throw new Error(mess);
  }
};
