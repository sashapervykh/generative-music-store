import { Flex, Segmented } from "antd";
import { Language } from "./components/Language/Language";
import { Seed } from "./components/Seed/Seed";
import { Likes } from "./components/Likes/Likes";
import { View } from "./components/View/View";

export function Toolbar() {
  return (
    <>
      <Flex>
        <Language />
        <Seed />
        <Likes />
        <View />
      </Flex>
    </>
  );
}
