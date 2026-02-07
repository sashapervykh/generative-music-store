import { Input } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";

export function Seed() {
  const [value, setValue] = useState("12345678");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setValue(event.target.value);
  };
  return (
    <Label label="Seed">
      <Input
        id="Seed"
        value={value}
        onChange={handleChange}
        suffix={<ReloadOutlined className="cursor-pointer" />}
      ></Input>
    </Label>
  );
}
