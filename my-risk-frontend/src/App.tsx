import React from "react";
import RiskForm from "./components/RiskForm";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Dynamic Risk Assessment (Frontend)
      </h1>
      {/* Render our form component */}
      <RiskForm />
    </main>
  );
}

export default App;
