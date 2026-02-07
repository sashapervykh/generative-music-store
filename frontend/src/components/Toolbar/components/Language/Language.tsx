import { Flex, Select } from "antd";
import { Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

export function Language() {
  const [value, setValue] = useState("English");

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Flex vertical gap="small">
      <label htmlFor="language">
        <Text>Language</Text>
      </label>
      <Select
        className="w-auto"
        value={value}
        id="language"
        onChange={handleChange}
        options={[
          { value: "english", label: "English" },
          { value: "german", label: "German" },
        ]}
      />
    </Flex>
  );
}
