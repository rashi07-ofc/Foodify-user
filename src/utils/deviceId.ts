export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Secure random UUID
    localStorage.setItem("device_id", deviceId);
  }

  return deviceId;
};
