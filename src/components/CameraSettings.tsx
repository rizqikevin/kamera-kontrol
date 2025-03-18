import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";
import { cameraApi } from "../lib/cameraApi";

interface CameraSettingsProps {
  onResolutionChange?: (resolution: string) => Promise<void>;
  onFrameRateChange?: (frameRate: number) => Promise<void>;
  onNightModeToggle?: (enabled: boolean) => Promise<void>;
  defaultResolution?: string;
  defaultFrameRate?: number;
  defaultNightMode?: boolean;
}

// Resolution mapping to actual width and height values
const resolutionMap: Record<string, { width: number; height: number }> = {
  "480p": { width: 640, height: 480 },
  "720p": { width: 1280, height: 720 },
  "1080p": { width: 1920, height: 1080 },
  "1440p": { width: 2560, height: 1440 },
  "4K": { width: 3840, height: 2160 },
};

const CameraSettings = ({
  onResolutionChange = async () => {},
  onFrameRateChange = async () => {},
  onNightModeToggle = async () => {},
  defaultResolution = "720p",
  defaultFrameRate = 30,
  defaultNightMode = false,
}: CameraSettingsProps) => {
  const [resolution, setResolution] = useState(defaultResolution);
  const [frameRate, setFrameRate] = useState(defaultFrameRate);
  const [nightMode, setNightMode] = useState(defaultNightMode);
  const [isLoading, setIsLoading] = useState({
    resolution: false,
    frameRate: false,
    nightMode: false,
  });

  const { toast } = useToast();

  const handleResolutionChange = async (value: string) => {
    setIsLoading((prev) => ({ ...prev, resolution: true }));
    try {
      // Call the API to change resolution
      const { width, height } = resolutionMap[value] || resolutionMap["720p"];
      const result = await cameraApi.changeResolution(width, height);

      // Also call the original handler for compatibility
      await onResolutionChange(value);

      setResolution(value);
      toast({
        title: "Resolution updated",
        description: result.message || `Camera resolution set to ${value}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update resolution",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, resolution: false }));
    }
  };

  const handleFrameRateChange = async (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value <= 0) return;

    setIsLoading((prev) => ({ ...prev, frameRate: true }));
    try {
      await onFrameRateChange(value);
      setFrameRate(value);
      toast({
        title: "Frame rate updated",
        description: `Camera frame rate set to ${value} fps`,
      });
    } catch (error) {
      toast({
        title: "Failed to update frame rate",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, frameRate: false }));
    }
  };

  const handleNightModeToggle = async (checked: boolean) => {
    setIsLoading((prev) => ({ ...prev, nightMode: true }));
    try {
      await onNightModeToggle(checked);
      setNightMode(checked);
      toast({
        title: "Night mode updated",
        description: `Night mode ${checked ? "enabled" : "disabled"}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update night mode",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, nightMode: false }));
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Camera Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="resolution">Resolution</Label>
            {isLoading.resolution && (
              <span className="text-xs text-muted-foreground">Updating...</span>
            )}
          </div>
          <Select
            value={resolution}
            onValueChange={handleResolutionChange}
            disabled={isLoading.resolution}
          >
            <SelectTrigger id="resolution" className="w-full">
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="480p">480p</SelectItem>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="1440p">1440p</SelectItem>
              <SelectItem value="4K">4K</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="frameRate">Frame Rate (fps)</Label>
            {isLoading.frameRate && (
              <span className="text-xs text-muted-foreground">Updating...</span>
            )}
          </div>
          <Input
            id="frameRate"
            type="number"
            min="1"
            max="120"
            value={frameRate}
            onChange={(e) =>
              setFrameRate(parseInt(e.target.value) || frameRate)
            }
            onBlur={handleFrameRateChange}
            disabled={isLoading.frameRate}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="nightMode">Night Mode</Label>
            <p className="text-xs text-muted-foreground">
              Enhance visibility in low light
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isLoading.nightMode && (
              <span className="text-xs text-muted-foreground">Updating...</span>
            )}
            <Switch
              id="nightMode"
              checked={nightMode}
              onCheckedChange={handleNightModeToggle}
              disabled={isLoading.nightMode}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraSettings;
