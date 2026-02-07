import { Button } from "antd";
import { useState } from "react";

function App() {
  const [result, setResult] = useState("");

  async function handleClick() {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "GET",
    });
    const json = await response.json();
    console.log(json);
  }
  return (
    <>
      <div
        className="flex  
            flex-col justify-center 
            gap-1 items-center"
      >
        <Button type="primary" onClick={handleClick}>
          Primary Button
        </Button>
        <p>{result}</p>
      </div>
    </>
  );
}

export default App;
