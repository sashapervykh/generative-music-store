import { useState } from "react";
import { Select } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { DEFAULT_CONFIG } from "../../../../constants/defaultConfig";

export function Language() {
  const [value, setValue] = useState("English");

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Label label={"language"}>
      <Select
        className="w-auto"
        value={value}
        id="language"
        onChange={handleChange}
        options={DEFAULT_CONFIG.LANGUAGE.OPTIONS}
      />
    </Label>
  );
}
