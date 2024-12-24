import React, { useState } from "react";

interface HealthResponse {
  status: string;
}

const RiskForm: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<string>("Unknown");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const checkHealth = async () => {
    try {
      // If your FastAPI backend is at http://127.0.0.1:8000
      // and the route is /api/health, do:
      const res = await fetch("http://127.0.0.1:8000/api/health");
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data: HealthResponse = await res.json();
      setHealthStatus(data.status);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Error fetching health status");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Risk Assessment Form</h2>

      <p className="mb-4">
        Click the button below to test a connection to the FastAPI backend.
      </p>

      <button
        onClick={checkHealth}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Backend Health
      </button>

      <div className="mt-4">
        <strong>Health Status:</strong> {healthStatus}
      </div>
      {errorMessage && (
        <div className="mt-2 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default RiskForm;
