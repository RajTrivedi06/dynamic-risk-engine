import React, { useState } from "react";
import Tester from "../src/components/tester";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Tester title="Counter Component" count={count} onClick={handleClick} />
    </div>
  );
};

export default App;
