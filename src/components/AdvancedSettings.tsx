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
import { useToast } from "./ui/use-toast";
import { cameraApi } from "../lib/cameraApi";

interface AdvancedSettingsProps {
  defaultMovieQuality?: number;
  defaultPictureOutput?: string;
}

const AdvancedSettings = ({
  defaultMovieQuality = 80,
  defaultPictureOutput = "on",
}: AdvancedSettingsProps) => {
  const [movieQuality, setMovieQuality] = useState(defaultMovieQuality);
  const [pictureOutput, setPictureOutput] = useState(defaultPictureOutput);
  const [isLoading, setIsLoading] = useState({
    movieQuality: false,
    pictureOutput: false,
  });

  const { toast } = useToast();

  const handleMovieQualityChange = async (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value < 0 || value > 100) return;

    setIsLoading((prev) => ({ ...prev, movieQuality: true }));
    try {
      const result = await cameraApi.changeMovieQuality(value);
      setMovieQuality(value);
      toast({
        title: "Movie quality updated",
        description: result.message || `Movie quality set to ${value}%`,
      });
    } catch (error) {
      toast({
        title: "Failed to update movie quality",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, movieQuality: false }));
    }
  };

  const handlePictureOutputChange = async (value: string) => {
    setIsLoading((prev) => ({ ...prev, pictureOutput: true }));
    try {
      const result = await cameraApi.changePictureOutput(value);
      setPictureOutput(value);
      toast({
        title: "Picture output updated",
        description: result.message || `Picture output mode set to ${value}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update picture output",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, pictureOutput: false }));
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="movieQuality">Movie Quality (%)</Label>
            {isLoading.movieQuality && (
              <span className="text-xs text-muted-foreground">Updating...</span>
            )}
          </div>
          <Input
            id="movieQuality"
            type="number"
            min="1"
            max="100"
            value={movieQuality}
            onChange={(e) =>
              setMovieQuality(parseInt(e.target.value) || movieQuality)
            }
            onBlur={handleMovieQualityChange}
            disabled={isLoading.movieQuality}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="pictureOutput">Picture Output Mode</Label>
            {isLoading.pictureOutput && (
              <span className="text-xs text-muted-foreground">Updating...</span>
            )}
          </div>
          <Select
            value={pictureOutput}
            onValueChange={handlePictureOutputChange}
            disabled={isLoading.pictureOutput}
          >
            <SelectTrigger id="pictureOutput" className="w-full">
              <SelectValue placeholder="Select picture output mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on">On</SelectItem>
              <SelectItem value="off">Off</SelectItem>
              <SelectItem value="first">First</SelectItem>
              <SelectItem value="best">Best</SelectItem>
              <SelectItem value="center">Center</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
