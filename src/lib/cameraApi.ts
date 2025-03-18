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

  changeFrameRate: async (framerate: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/framerate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ framerate }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to change frame rate:", error);
      throw error;
    }
  },

  captureImage: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/capture`);
      return await response.json();
    } catch (error) {
      console.error("Failed to capture image:", error);
      throw error;
    }
  },

  startRecording: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/start-recording`);
      return await response.json();
    } catch (error) {
      console.error("Failed to start recording:", error);
      throw error;
    }
  },

  stopRecording: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stop-recording`);
      return await response.json();
    } catch (error) {
      console.error("Failed to stop recording:", error);
      throw error;
    }
  },

  changeMovieQuality: async (quality: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie-quality`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quality }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to change movie quality:", error);
      throw error;
    }
  },

  changePictureOutput: async (mode: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/picture-output`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to change picture output mode:", error);
      throw error;
    }
  },
};
