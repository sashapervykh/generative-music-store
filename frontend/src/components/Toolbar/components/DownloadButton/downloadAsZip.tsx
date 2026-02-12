import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { Song } from "../../../../types/Song";

export const downloadSongsAsZip = async (songs: Song[]) => {
  try {
    const zip = new JSZip();
    const folder = zip.folder("music_downloads");
    await Promise.all(
      songs.map(async (song) => {
        try {
          const response = await axios.get(song.music, {
            responseType: "blob",
          });
          const filename = `${song.title}-${song.album}-${song.artist}.mp3`;
          folder?.file(filename, response.data, { binary: true });
        } catch (error) {
          console.error(`Failed to download ${song.title}:`, error);
        }
      }),
    );
    const content = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    saveAs(content, "songs.zip");
  } catch (error) {
    console.error("ZIP creation failed:", error);
    throw error;
  }
};
