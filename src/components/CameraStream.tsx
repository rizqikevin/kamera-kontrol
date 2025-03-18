import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import { Maximize2, Minimize2 } from "lucide-react";

interface CameraStreamProps {
  streamUrl?: string;
  cameraName?: string;
  onError?: (error: string) => void;
}

const CameraStream = ({
  streamUrl = "https://example.com/camera-stream",
  cameraName = "Main Camera",
  onError,
}: CameraStreamProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const { toast } = useToast();

  // Simulate stream loading
  useEffect(() => {
    const loadStream = async () => {
      try {
        // Simulate API call to initialize stream
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 20% chance of error for demo purposes
        if (Math.random() < 0.2) {
          throw new Error("Failed to connect to camera stream");
        }

        setIsLoading(false);
      } catch (error) {
        setStreamError(true);
        setIsLoading(false);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        toast({
          variant: "destructive",
          title: "Stream Error",
          description: errorMessage,
        });
        if (onError) onError(errorMessage);
      }
    };

    loadStream();
  }, [toast, onError]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card
      className={`bg-card overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : "w-full h-full"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-card">
        <CardTitle className="text-xl">{cameraName}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0 relative bg-black aspect-video">
        {isLoading ? (
          <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-4">
            <Skeleton className="w-full h-4/5 rounded-md" />
            <div className="w-full flex gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        ) : streamError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted/20">
            <div className="text-center p-6 rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">
                Camera Stream Unavailable
              </h3>
              <p className="text-muted-foreground mb-4">
                Unable to connect to the camera. Please check your connection
                and try again.
              </p>
              <Button
                onClick={() => {
                  setIsLoading(true);
                  setStreamError(false);
                  // Simulate retry
                  setTimeout(() => {
                    setIsLoading(false);
                    // 50% chance of success on retry for demo
                    setStreamError(Math.random() < 0.5);
                  }, 2000);
                }}
              >
                Retry Connection
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            {/* Stream from the Motion server */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <img
                src={`${streamUrl.replace(/\/+$/, "")}/0/stream`}
                alt="Camera feed"
                className="w-full h-full object-cover"
                onError={() => {
                  setStreamError(true);
                  if (onError) onError("Failed to load camera stream");
                }}
              />
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                Live
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CameraStream;
