import { Flex, Select } from "antd";
import { Language } from "./components/Language/Language";

export function Toolbar() {
  return (
    <>
      <Flex>
        <Language />
      </Flex>
    </>
  );
}
