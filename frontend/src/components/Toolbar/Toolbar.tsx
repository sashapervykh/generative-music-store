import { Flex, Row, Segmented, Space } from "antd";
import { Language } from "./components/Language/Language";
import { Seed } from "./components/Seed/Seed";
import { Likes } from "./components/Likes/Likes";
import { View } from "./components/View/View";

export function Toolbar() {
  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-[minmax(100px,20%)_minmax(150px,30%)_minmax(150px,33%)_auto]
 gap-4 p-3 bg-gray-100 w-[90%] m-auto rounded-xl "
      >
        <Language />
        <Seed />
        <Likes />
        <View />
      </div>
    </>
  );
}
