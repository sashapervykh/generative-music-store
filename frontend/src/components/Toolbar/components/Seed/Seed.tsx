import { Flex } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

export function Seed() {
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
