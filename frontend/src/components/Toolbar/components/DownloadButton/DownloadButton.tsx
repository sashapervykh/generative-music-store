import { useSongs } from "../../../../hooks/useSongs";
import { DownloadOutlined } from "@ant-design/icons";
import { downloadSongsAsZip } from "./downloadAsZip";

export function DownloadButton() {
  const { songs } = useSongs();

  return (
    <>
      <DownloadOutlined
        className="cursor-pointer"
        onClick={() => downloadSongsAsZip(songs)}
      />
    </>
  );
}
