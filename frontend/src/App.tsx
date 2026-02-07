import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        className="flex  
            flex-col justify-center 
            gap-1 items-center"
      >
        <h1 className="text-green-500 font-bold">GeeksforGeeks</h1>

        <Button className="bg-[#6bbf4c]" type="primary">
          Primary Button
        </Button>
      </div>
    </>
  );
}

export default App;
