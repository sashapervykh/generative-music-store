import { Flex } from "antd";
import { Typography } from "antd";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
}

const { Text } = Typography;
export function Label({ children, label }: Props) {
  return (
    <Flex className="relative" vertical gap="small">
      <label htmlFor={label}>
        <Text>{label}</Text>
      </label>
      {children}
    </Flex>
  );
}
