import { Language } from "./components/Language/Language";
import { Seed } from "./components/Seed/Seed";
import { Likes } from "./components/Likes/Likes";
import { View } from "./components/View/View";
import { DownloadButton } from "./components/DownloadButton/DownloadButton";

export function Toolbar() {
  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-[minmax(75px,20%)_minmax(125px,20%)_minmax(125px,25%)_auto]
 gap-4 p-3 bg-gray-100 w-[90%] m-auto rounded-xl "
      >
        <Language />
        <Seed />
        <Likes />
        <div className="flex ml-auto mr-0 items-center gap-2">
          <DownloadButton />
          <View />
        </div>
      </div>
    </>
  );
}
