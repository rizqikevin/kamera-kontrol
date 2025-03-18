import React from "react";
import CameraDashboard from "./CameraDashboard";
import { Toaster } from "./ui/toaster";

interface HomeProps {
  apiEndpoint?: string;
  cameraId?: string;
  cameraName?: string;
}

const Home = ({
  apiEndpoint = "https://api.example.com/cameras",
  cameraId = "cam-001",
  cameraName = "Main Surveillance Camera",
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <main>
        <CameraDashboard
          apiEndpoint={apiEndpoint}
          cameraId={cameraId}
          cameraName={cameraName}
        />
      </main>
    </div>
  );
};

export default Home;
