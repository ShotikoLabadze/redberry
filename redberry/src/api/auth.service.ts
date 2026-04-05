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

export const getMe = async () => {
  try {
    const response = await API.get("/me");
    return response.data;
  } catch (err: any) {
    throw new Error("Failed to fetch user data");
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await API.put("/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: any) {
    const mess = err.response?.data?.message || "Update failed";
    throw new Error(mess);
  }
};
