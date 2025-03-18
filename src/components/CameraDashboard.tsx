import React, { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import CameraStream from "./CameraStream";
import ControlPanel from "./ControlPanel";
import ThemeToggle from "./ThemeToggle";
import { cameraApi } from "../lib/cameraApi";

interface CameraDashboardProps {
  apiEndpoint?: string;
  cameraId?: string;
  cameraName?: string;
}

const CameraDashboard = ({
  apiEndpoint = "https://api.example.com/cameras",
  cameraId = "cam-001",
  cameraName = "Main Surveillance Camera",
}: CameraDashboardProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeCamera = async () => {
      setIsLoading(true);
      try {
        // Try to start the stream using the real API
        const result = await cameraApi.startStream();
        setIsConnected(true);
        toast({
          title: "Camera Connected",
          description:
            result.message || `Successfully connected to ${cameraName}`,
        });
      } catch (error) {
        console.error("Failed to connect to camera:", error);
        setIsConnected(false);
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeCamera();

    // Cleanup function to stop the stream when component unmounts
    return () => {
      const stopCamera = async () => {
        try {
          if (isConnected) {
            await cameraApi.stopStream();
            console.log("Camera stream stopped");
          }
        } catch (error) {
          console.error("Error stopping camera stream:", error);
        }
      };

      stopCamera();
    };
  }, [cameraId, cameraName, toast]);

  // Camera control handlers
  const handlePanTilt = async (direction: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast({
        title: "Camera Movement",
        description: `Camera moved ${direction}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Movement Failed",
        description: "Failed to move camera",
      });
    }
  };

  const handleZoom = async (direction: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast({
        title: "Camera Zoom",
        description: `Camera zoomed ${direction}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Zoom Failed",
        description: "Failed to zoom camera",
      });
    }
  };

  const handlePresetSave = async (presetNumber: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast({
        title: "Preset Saved",
        description: `Camera position saved to preset ${presetNumber}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Failed to save preset position",
      });
    }
  };

  const handlePresetLoad = async (presetNumber: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast({
        title: "Preset Loaded",
        description: `Camera moved to preset ${presetNumber}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Load Failed",
        description: "Failed to load preset position",
      });
    }
  };

  const handleResolutionChange = async (resolution: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Resolution Changed",
        description: `Camera resolution set to ${resolution}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Change Failed",
        description: "Failed to change resolution",
      });
    }
  };

  const handleFrameRateChange = async (frameRate: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Frame Rate Changed",
        description: `Camera frame rate set to ${frameRate} fps`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Change Failed",
        description: "Failed to change frame rate",
      });
    }
  };

  const handleNightModeToggle = async (enabled: boolean) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Night Mode",
        description: `Night mode ${enabled ? "enabled" : "disabled"}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Toggle Failed",
        description: "Failed to toggle night mode",
      });
    }
  };

  const handleTakeScreenshot = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast({
        title: "Screenshot Taken",
        description: "Screenshot saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Screenshot Failed",
        description: "Failed to take screenshot",
      });
    }
  };

  const handleToggleRecording = async () => {
    try {
      // Use the real API to start or stop recording
      const result = isRecording
        ? await cameraApi.stopRecording()
        : await cameraApi.startRecording();

      setIsRecording(!isRecording);
      toast({
        title: isRecording ? "Recording Stopped" : "Recording Started",
        description:
          result.message ||
          (isRecording
            ? "Camera recording has been stopped"
            : "Camera is now recording"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Recording Toggle Failed",
        description: "Failed to toggle recording state",
      });
    }
  };

  const handleDownloadFootage = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Download Started",
        description: "Camera footage download initiated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download camera footage",
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background p-4 md:p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{cameraName} Dashboard</h1>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2">
          <CameraStream
            streamUrl={`${apiEndpoint}/${cameraId}/stream`}
            cameraName={cameraName}
            onError={(error) => {
              toast({
                variant: "destructive",
                title: "Stream Error",
                description: error,
              });
            }}
          />
        </div>
        <div className="lg:col-span-1">
          <ControlPanel
            isConnected={isConnected}
            onPanTilt={handlePanTilt}
            onZoom={handleZoom}
            onPresetSave={handlePresetSave}
            onPresetLoad={handlePresetLoad}
            onResolutionChange={handleResolutionChange}
            onFrameRateChange={handleFrameRateChange}
            onNightModeToggle={handleNightModeToggle}
            onTakeScreenshot={handleTakeScreenshot}
            onToggleRecording={handleToggleRecording}
            onDownloadFootage={handleDownloadFootage}
          />
        </div>
      </div>

      <footer className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Camera System v1.0 | Status:{" "}
          {isConnected ? "Connected" : "Disconnected"}
        </p>
      </footer>
    </div>
  );
};

export default CameraDashboard;
