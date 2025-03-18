import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useToast } from "./ui/use-toast";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Save,
  RotateCw,
} from "lucide-react";

interface MovementControlsProps {
  onPanTilt?: (direction: string) => Promise<void>;
  onZoom?: (direction: string) => Promise<void>;
  onPresetSave?: (presetNumber: number) => Promise<void>;
  onPresetLoad?: (presetNumber: number) => Promise<void>;
  isConnected?: boolean;
}

const MovementControls = ({
  onPanTilt = async (direction) => {
    console.log(`Pan/tilt ${direction} requested`);
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  onZoom = async (direction) => {
    console.log(`Zoom ${direction} requested`);
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  onPresetSave = async (presetNumber) => {
    console.log(`Save preset ${presetNumber} requested`);
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  onPresetLoad = async (presetNumber) => {
    console.log(`Load preset ${presetNumber} requested`);
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  isConnected = true,
}: MovementControlsProps) => {
  const { toast } = useToast();
  const [speed, setSpeed] = useState<number[]>([50]);
  const [isLoading, setIsLoading] = useState<{
    direction: string | null;
    zoom: string | null;
    preset: number | null;
  }>({
    direction: null,
    zoom: null,
    preset: null,
  });

  const handlePanTilt = async (direction: string) => {
    if (!isConnected) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Camera is not connected. Please check your connection.",
      });
      return;
    }

    setIsLoading((prev) => ({ ...prev, direction }));
    try {
      await onPanTilt(direction);
      toast({
        title: "Success",
        description: `Camera moved ${direction}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Movement Error",
        description: `Failed to move camera ${direction}`,
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, direction: null }));
    }
  };

  const handleZoom = async (direction: string) => {
    if (!isConnected) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Camera is not connected. Please check your connection.",
      });
      return;
    }

    setIsLoading((prev) => ({ ...prev, zoom: direction }));
    try {
      await onZoom(direction);
      toast({
        title: "Success",
        description: `Camera zoomed ${direction}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Zoom Error",
        description: `Failed to zoom camera ${direction}`,
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, zoom: null }));
    }
  };

  const handlePreset = async (
    presetNumber: number,
    action: "save" | "load",
  ) => {
    if (!isConnected) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Camera is not connected. Please check your connection.",
      });
      return;
    }

    setIsLoading((prev) => ({ ...prev, preset: presetNumber }));
    try {
      if (action === "save") {
        await onPresetSave(presetNumber);
        toast({
          title: "Success",
          description: `Preset ${presetNumber} saved`,
        });
      } else {
        await onPresetLoad(presetNumber);
        toast({
          title: "Success",
          description: `Preset ${presetNumber} loaded`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Preset Error",
        description: `Failed to ${action} preset ${presetNumber}`,
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, preset: null }));
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Movement Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Pan/Tilt Controls */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Pan & Tilt</h3>
            <div className="grid grid-cols-3 gap-2 w-full max-w-[250px] mx-auto">
              <div className="col-start-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  disabled={isLoading.direction === "up"}
                  onClick={() => handlePanTilt("up")}
                >
                  {isLoading.direction === "up" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="col-start-1 row-start-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  disabled={isLoading.direction === "left"}
                  onClick={() => handlePanTilt("left")}
                >
                  {isLoading.direction === "left" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <ArrowLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="col-start-3 row-start-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  disabled={isLoading.direction === "right"}
                  onClick={() => handlePanTilt("right")}
                >
                  {isLoading.direction === "right" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="col-start-2 row-start-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  disabled={isLoading.direction === "down"}
                  onClick={() => handlePanTilt("down")}
                >
                  {isLoading.direction === "down" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Movement Speed</h3>
              <span className="text-xs text-muted-foreground">{speed[0]}%</span>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Zoom Controls */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Zoom</h3>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="w-20"
                disabled={isLoading.zoom === "in"}
                onClick={() => handleZoom("in")}
              >
                {isLoading.zoom === "in" ? (
                  <span className="animate-spin mr-2">⟳</span>
                ) : (
                  <ZoomIn className="h-4 w-4 mr-2" />
                )}
                In
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-20"
                disabled={isLoading.zoom === "out"}
                onClick={() => handleZoom("out")}
              >
                {isLoading.zoom === "out" ? (
                  <span className="animate-spin mr-2">⟳</span>
                ) : (
                  <ZoomOut className="h-4 w-4 mr-2" />
                )}
                Out
              </Button>
            </div>
          </div>

          {/* Preset Controls */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Presets</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((preset) => (
                <div key={preset} className="flex flex-col gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={isLoading.preset === preset}
                    onClick={() => handlePreset(preset, "load")}
                  >
                    {isLoading.preset === preset ? (
                      <span className="animate-spin mr-2">⟳</span>
                    ) : (
                      <RotateCw className="h-3 w-3 mr-1" />
                    )}
                    Preset {preset}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    disabled={isLoading.preset === preset}
                    onClick={() => handlePreset(preset, "save")}
                  >
                    {isLoading.preset === preset ? (
                      <span className="animate-spin mr-2">⟳</span>
                    ) : (
                      <Save className="h-3 w-3 mr-1" />
                    )}
                    Save
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovementControls;
