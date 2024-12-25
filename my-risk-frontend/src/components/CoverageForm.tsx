// frontend/src/components/CoverageForm.tsx

import React, { useState } from "react";

interface CoverageResponse {
  dwelling_coverage: number;
  personal_property: number;
  liability_coverage: number;
}

const CoverageForm: React.FC = () => {
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [squareFootage, setSquareFootage] = useState<number | null>(null);
  const [yearBuilt, setYearBuilt] = useState<number | null>(null);
  const [roofAge, setRoofAge] = useState<number | null>(null);
  const [hasPool, setHasPool] = useState(false);
  const [result, setResult] = useState<CoverageResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCoverageCalculation = async () => {
    if (!city || !propertyType || !squareFootage) {
      setErrorMessage("City, property type, and square footage are required.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/calculate-coverage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city,
            property_type: propertyType,
            square_footage: squareFootage,
            year_built: yearBuilt,
            roof_age: roofAge,
            has_pool: hasPool,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `Server responded with ${response.status}`
        );
      }
      const data: CoverageResponse = await response.json();
      setResult(data);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Error calculating coverage.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Coverage Estimation Form</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., Los Angeles"
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
          placeholder="e.g., House, Condo"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Square Footage:</label>
        <input
          type="number"
          value={squareFootage ?? ""}
          onChange={(e) => setSquareFootage(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 2000"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Year Built (optional):</label>
        <input
          type="number"
          value={yearBuilt ?? ""}
          onChange={(e) => setYearBuilt(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 1990"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Roof Age (optional, years):
        </label>
        <input
          type="number"
          value={roofAge ?? ""}
          onChange={(e) => setRoofAge(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 10"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hasPool}
            onChange={(e) => setHasPool(e.target.checked)}
          />
          <span>Has Pool?</span>
        </label>
      </div>

      <button
        onClick={handleCoverageCalculation}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Get Coverage Estimate
      </button>

      {errorMessage && (
        <div className="mt-4 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="font-semibold mb-2">Estimated Coverage</h3>
          <p>
            <strong>Dwelling Coverage:</strong> ${result.dwelling_coverage}
          </p>
          <p>
            <strong>Personal Property:</strong> ${result.personal_property}
          </p>
          <p>
            <strong>Liability Coverage:</strong> ${result.liability_coverage}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoverageForm;
