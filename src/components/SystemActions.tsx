import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, Video, Maximize, Download } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface SystemActionsProps {
  onTakeScreenshot?: () => Promise<void>;
  onToggleRecording?: () => Promise<void>;
  onToggleFullscreen?: () => void;
  onDownloadFootage?: () => Promise<void>;
}

const SystemActions = ({
  onTakeScreenshot = async () => {
    // Default implementation for demo purposes
    console.log("Taking screenshot...");
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
  onToggleRecording = async () => {
    // Default implementation for demo purposes
    console.log("Toggling recording...");
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
  onToggleFullscreen = () => {
    // Default implementation for demo purposes
    console.log("Toggling fullscreen...");
  },
  onDownloadFootage = async () => {
    // Default implementation for demo purposes
    console.log("Downloading footage...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
}: SystemActionsProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState({
    screenshot: false,
    recording: false,
    download: false,
  });

  const handleTakeScreenshot = async () => {
    setIsLoading((prev) => ({ ...prev, screenshot: true }));
    try {
      await onTakeScreenshot();
      toast({
        title: "Screenshot taken",
        description: "Screenshot has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to take screenshot",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, screenshot: false }));
    }
  };

  const handleToggleRecording = async () => {
    setIsLoading((prev) => ({ ...prev, recording: true }));
    try {
      await onToggleRecording();
      setIsRecording(!isRecording);
      toast({
        title: isRecording ? "Recording stopped" : "Recording started",
        description: isRecording
          ? "Your recording has been saved"
          : "Camera is now recording",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isRecording ? "stop" : "start"} recording`,
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, recording: false }));
    }
  };

  const handleDownloadFootage = async () => {
    setIsLoading((prev) => ({ ...prev, download: true }));
    try {
      await onDownloadFootage();
      toast({
        title: "Download started",
        description: "Your footage is being downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download footage",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, download: false }));
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">System Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleTakeScreenshot}
            disabled={isLoading.screenshot}
          >
            <Camera className="h-4 w-4" />
            {isLoading.screenshot ? "Processing..." : "Take Screenshot"}
          </Button>

          <Button
            variant={isRecording ? "destructive" : "outline"}
            className="flex items-center gap-2"
            onClick={handleToggleRecording}
            disabled={isLoading.recording}
          >
            <Video className="h-4 w-4" />
            {isLoading.recording
              ? "Processing..."
              : isRecording
                ? "Stop Recording"
                : "Start Recording"}
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onToggleFullscreen}
          >
            <Maximize className="h-4 w-4" />
            Toggle Fullscreen
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleDownloadFootage}
            disabled={isLoading.download}
          >
            <Download className="h-4 w-4" />
            {isLoading.download ? "Downloading..." : "Download Footage"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemActions;
