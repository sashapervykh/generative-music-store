import { Flex } from "antd";
import { Language } from "./components/Language/Language";
import { Seed } from "./components/Seed/Seed";
import { Likes } from "./components/Likes/Likes";

export function Toolbar() {
  return (
    <>
      <Flex>
        <Language />
        <Seed />
        <Likes />
      </Flex>
    </>
  );
}
