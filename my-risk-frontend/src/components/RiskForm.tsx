// frontend/src/components/RiskForm.tsx

import React, { useState } from "react";

interface RiskResponse {
  zip_code: string;
  property_type: string;
  weather_factor: number;
  risk_score: number;
}

const RiskForm: React.FC = () => {
  const [zipCode, setZipCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [result, setResult] = useState<RiskResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRiskCalculation = async () => {
    if (!zipCode) {
      setErrorMessage("Please enter a ZIP Code.");
      return;
    }
    if (!propertyType) {
      setErrorMessage("Please enter a Property Type.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/calculate-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zip_code: zipCode,
          property_type: propertyType,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `Server responded with ${response.status}`
        );
      }
      const data: RiskResponse = await response.json();
      setResult(data);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Error calculating risk score.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Risk Assessment Form</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">ZIP Code:</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 10001"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Property Type:</label>
        <input
          type="text"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., House, Apartment, Condo"
          required
        />
      </div>

      <button
        onClick={handleRiskCalculation}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Get Risk Score
      </button>

      {errorMessage && (
        <div className="mt-4 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="font-semibold mb-2">Risk Score Results</h3>
          <p>
            <strong>ZIP Code:</strong> {result.zip_code}
          </p>
          <p>
            <strong>Property Type:</strong> {result.property_type}
          </p>
          <p>
            <strong>Weather Factor:</strong> {result.weather_factor}
          </p>
          <p>
            <strong>Risk Score:</strong> {result.risk_score}
          </p>
        </div>
      )}
    </div>
  );
};

export default RiskForm;
