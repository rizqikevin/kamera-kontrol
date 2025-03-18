// Camera API service

const API_BASE_URL = "http://192.168.1.27:3000";

export const cameraApi = {
  startStream: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/start`);
      return await response.json();
    } catch (error) {
      console.error("Failed to start stream:", error);
      throw error;
    }
  },

  stopStream: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stop`);
      return await response.json();
    } catch (error) {
      console.error("Failed to stop stream:", error);
      throw error;
    }
  },

  changeResolution: async (width: number, height: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resolution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ width, height }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to change resolution:", error);
      throw error;
    }
  },
};
