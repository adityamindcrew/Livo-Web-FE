import { API_BASE_URL } from "../../config/apiBase";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}
const token = sessionStorage.getItem("token");

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}super-admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store token in session storage
    sessionStorage.setItem("token", data.token);

    return data;
  } catch (error: any) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};

export const logout = async (): Promise<{ message: string }> => {
  if (!token) throw new Error("No session token found.");

  const response = await fetch(`${API_BASE_URL}super-admin/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};
