import { Flex } from "antd";
import { Language } from "./components/Language/Language";
import { Seed } from "./components/Seed/Seed";

export function Toolbar() {
  return (
    <>
      <Flex>
        <Language />
        <Seed />
      </Flex>
    </>
  );
}
