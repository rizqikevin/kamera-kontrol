import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import MovementControls from "./MovementControls";
import CameraSettings from "./CameraSettings";
import SystemActions from "./SystemActions";

interface ControlPanelProps {
  isConnected?: boolean;
  onPanTilt?: (direction: string) => Promise<void>;
  onZoom?: (direction: string) => Promise<void>;
  onPresetSave?: (presetNumber: number) => Promise<void>;
  onPresetLoad?: (presetNumber: number) => Promise<void>;
  onResolutionChange?: (resolution: string) => Promise<void>;
  onFrameRateChange?: (frameRate: number) => Promise<void>;
  onNightModeToggle?: (enabled: boolean) => Promise<void>;
  onTakeScreenshot?: () => Promise<void>;
  onToggleRecording?: () => Promise<void>;
  onToggleFullscreen?: () => void;
  onDownloadFootage?: () => Promise<void>;
}

const ControlPanel = ({
  isConnected = true,
  onPanTilt,
  onZoom,
  onPresetSave,
  onPresetLoad,
  onResolutionChange,
  onFrameRateChange,
  onNightModeToggle,
  onTakeScreenshot,
  onToggleRecording,
  onToggleFullscreen,
  onDownloadFootage,
}: ControlPanelProps) => {
  return (
    <Card className="w-full h-full bg-card">
      <CardHeader>
        <CardTitle>Camera Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="movement" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="movement">Movement</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="movement" className="space-y-4">
            <MovementControls
              isConnected={isConnected}
              onPanTilt={onPanTilt}
              onZoom={onZoom}
              onPresetSave={onPresetSave}
              onPresetLoad={onPresetLoad}
            />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <CameraSettings
              onResolutionChange={onResolutionChange}
              onFrameRateChange={onFrameRateChange}
              onNightModeToggle={onNightModeToggle}
            />
          </TabsContent>
          <TabsContent value="actions" className="space-y-4">
            <SystemActions
              onTakeScreenshot={onTakeScreenshot}
              onToggleRecording={onToggleRecording}
              onToggleFullscreen={onToggleFullscreen}
              onDownloadFootage={onDownloadFootage}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
