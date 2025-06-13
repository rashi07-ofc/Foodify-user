import axios from "../../api/axios";
import { getDeviceId } from "../../utils/deviceId";

// Login function
export const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
    device_id: getDeviceId(),
    role: 1,
  });

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Logout function (unchanged)
export const logout = async () => {
  const accessToken = localStorage.getItem("accessToken");

  await axios.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  delete axios.defaults.headers.common["Authorization"];
};
